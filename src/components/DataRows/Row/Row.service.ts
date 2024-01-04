import { IRow, IRowResponse } from "../../../models/Row.model"
import { useActions, useAppState } from "../../../store"
import { Api } from '../../../api'
import { createRow, getRows } from "../DataRows.service"
import { ICellProps, ILevelProps } from "./Row.types"

export function GetCellProps(id:number, ref: React.MutableRefObject<IRow>){
	const {rows, rowEditable} = useAppState(state => state.Rows)
	const {setRowsAction, startEditingAction, stopEditingAction} = useActions()
	const [updateRow] = Api.useUpdateRowMutation()
	const [createRow] = Api.useCreateRowMutation()

	const propsCell:Omit<ICellProps, 'fieldName'> =
	rowEditable === id
	?	{
			editable: true,
			id:id,
			editing: (fieldName:keyof IRow, value:any) => {
				ref.current = {...ref.current, [fieldName]: value}
			},
			stopEditing: async() => {
				if(id === 0){ setRowsAction(recalculatedRow(rows, await createRow(ref.current).unwrap(), ref.current)) }
				if(id > 0){ setRowsAction(recalculatedRow(rows, await updateRow({id, body:{...ref.current}}).unwrap(), ref.current)) }
				stopEditingAction()
			}
		}
	:	{
			editable: false,
			id:id,
			startEditing: () => rowEditable === null && startEditingAction(id)
		}
	
	return propsCell
}

function recalculatedRow(rows: IRow[], response:IRowResponse, currentRow:IRow): IRow[] {
	const newRows = [...rows]

	const newRow:({index:number, row:IRow}) = {
		index: newRows.findIndex(row => row.id ===currentRow.id),
		row: {parentId:currentRow.parentId, level: currentRow.level,...response.current, total: currentRow.total}
	}
	newRows.splice(newRow.index,1,newRow.row)

	if(currentRow.parentId){
		const parentIndex = newRows.findIndex(row => row.id ===currentRow.parentId)
		const parentRow:({index:number, row:IRow}) = {
			index: parentIndex,
			row: {...newRows[parentIndex], total:newRows[parentIndex].total+1}
		}
		newRows.splice(parentRow.index,1,parentRow.row)
	}



	response.changed.forEach(changedRow=>{
		const oldRow = newRows.find(row => row.id ===changedRow.id)
		if(oldRow){
			const total = oldRow.total
			const parentId = oldRow.parentId
			const level = oldRow.level
			const index = newRows.findIndex(row => row.id === oldRow.id)
			const newRow :IRow = {...changedRow, parentId, level, total}
			newRows.splice(index,1,newRow)
		}
	})
	return newRows
}

export function getIndexForNewLine(rows: IRow[], index:number):number{
	// @ts-ignore   //findLastIndex не существует в rows ??!!
	const cIndex = rows.findLastIndex(row => row.parentId === rows[index].id)
	if(cIndex < 0) return index+1
	if(rows[cIndex].total === 0) return cIndex+1
	return getIndexForNewLine(rows,cIndex)
}

export function GetLevelProps(row:IRow, index:number):ILevelProps{
	const {rows} = useAppState(state => state.Rows)
	const {setRowsAction} = useActions()
	const [deleteRow] = Api.useDeleteRowMutation()
	const {addRowAction, startEditingAction} = useActions()

	const i = getIndexForNewLine(rows, index)

	return({
		index,
		id:row.id,
		level:row.level,
		pID:row.parentId,
		createNewRow:()=>{
			addRowAction({
				index: i,
				newRow: createRow(row.level+1, row.id)
			})
			startEditingAction(0)
		},
		deleteRow: async() => {
			const response = await deleteRow(row.id).unwrap()
			const newRows = [...rows]

			if(row.parentId){
				const parentIndex = newRows.findIndex(orow => orow.id ===row.parentId)
				const parentRow:({index:number, row:IRow}) = {
					index: parentIndex,
					row: {...newRows[parentIndex], total:newRows[parentIndex].total-1}
				}
				newRows.splice(parentRow.index,1,parentRow.row)
		
			}
			response.changed.forEach(changedRow=>{
				const oldRow = newRows.find(row => row.id ===changedRow.id)
				if(oldRow){
					const total = oldRow.total
					const parentId = oldRow.parentId
					const level = oldRow.level
					const index = newRows.findIndex(row => row.id === oldRow.id)
					const newRow :IRow = {...changedRow, parentId, level, total}
					newRows.splice(index,1,newRow)
				}
			})
			newRows.splice(index,1)

			clearRows(newRows)

			if(newRows.length === 0) newRows.push(...getRows([]))
			setRowsAction(newRows)
		}
	})
}

function clearRows(rows:IRow[]) {
	let toTrash:number[] = []
	rows.forEach((row, i) => {
		if(row.parentId === null) return;
		const index = rows.findIndex(pRow => {
			return pRow.id === row.parentId
		})
		if(index < 0){
			toTrash.push(i)
		}
	})
	if(toTrash.length > 0){
		toTrash.forEach(i => rows.splice(i,1))
		toTrash=[]
		clearRows(rows)
	}
}