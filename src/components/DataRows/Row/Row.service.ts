import { IRow } from "../../../models/Row.model"
import { useActions, useAppState } from "../../../store"
import { Api } from '../../../api'
import { createRow } from "../DataRows.service"
import { ICellProps, ILevelProps } from "./Row.types"

export function GetCellProps(id:number, ref: React.MutableRefObject<IRow>){
	const {rowEditable} = useAppState(state => state.Rows)
	const {startEditingAction, stopEditingAction} = useActions()
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
				id > 0
				?	await updateRow({
						id:id,
						body:{
							...ref.current
						}
					}).finally(() => stopEditingAction())
				:	await createRow(ref.current).finally(() => stopEditingAction())
			}
		}
	:	{
			editable: false,
			id:id,
			startEditing: () => rowEditable === null && startEditingAction(id)
		}
	
	return propsCell
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
	const [deleteRow] = Api.useDeleteRowMutation()
	const {addRowAction, startEditingAction} = useActions()

	return({
		index,
		id:row.id,
		level:row.level,
		pID:row.parentId,
		createNewRow:()=>{
			addRowAction({
				index: getIndexForNewLine(rows, index),
				newRow: createRow(row.level+1, row.id)
			})
			startEditingAction(0)
		},
		deleteRow:() => deleteRow(row.id)
	})
}
