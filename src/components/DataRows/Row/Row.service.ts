import { IRow, IRowResponse } from "../../../models/Row.model"
import { useActions, useAppState } from "../../../store"
import { Api } from '../../../api'
import { createRow } from "../DataRows.service"
import { ICellProps, ILevelProps } from "./Row.types"

export function GetCellProps(currentRow:IRow, ref: React.MutableRefObject<IRow>, currentIndex:number):Omit<ICellProps, 'fieldName'>{
	const {rows, rowEditable} = useAppState(state => state.Rows)
	const {setRowsAction, startEditingAction, stopEditingAction} = useActions()
	const [updateRow] = Api.useUpdateRowMutation()
	const [createRow] = Api.useCreateRowMutation()

	return rowEditable === currentRow.id
	?	{
			editable: true,
			id:currentRow.id,
			editing: (fieldName:keyof IRow, value:any) => {
				ref.current = {...ref.current, [fieldName]: value}
			},
			stopEditing: async() => {
				if(currentRow.id === 0)
					setRowsAction(recalculatedRows(rows, await createRow(ref.current).unwrap(), currentIndex))
				if(currentRow.id > 0)
					setRowsAction(recalculatedRows(rows, await updateRow(ref.current).unwrap(), currentIndex))

				stopEditingAction()
			}
		}
	:	{
			editable: false,
			id:currentRow.id,
			startEditing: () => rowEditable === null && startEditingAction(currentRow.id)
		}
}

export function GetLevelProps(currentRow:IRow, currentIndex:number):ILevelProps{
	const {rows, mouseOverLevel} = useAppState(state => state.Rows)
	const {setRowsAction, addRowAction, startEditingAction, mouseLeaveLevelAction} = useActions()
	const [deleteRow] = Api.useDeleteRowMutation()

	return({
		currentIndex,
		currentRow,
		createNewRow:()=>{
			addRowAction({
				index: getIndexForNewLine(rows, currentIndex),
				newRow: createRow(currentRow.level+1, currentRow.id)
			})
			startEditingAction(0)
		},
		deleteRow: async() => {
			setRowsAction(recalculatedRows(rows, await deleteRow(currentRow.id).unwrap(), currentIndex))
			if(mouseOverLevel) mouseLeaveLevelAction()
		}
	})
}

export function getIndexForNewLine(rows: IRow[], index:number):number{
	// @ts-ignore   //findLastIndex не существует в rows ??!!
	const cIndex = rows.findLastIndex(row => row.parentId === rows[index].id)
	if(cIndex < 0) return index+1
	if(rows[cIndex].total === 0) return cIndex+1
	return getIndexForNewLine(rows,cIndex)
}

function clearRows(rows:IRow[]) {
	let toTrash:number[] = []
	rows.forEach((row, index) => {
		if(row.parentId === null) return;
		const parentIndex = rows.findIndex(pRow => pRow.id === row.parentId)
		if(parentIndex < 0) toTrash.push(index)
	})
	if(toTrash.length > 0){
		toTrash.reverse().forEach(i => rows.splice(i,1))
		clearRows(rows)
	}
}

function recalculatedRows(rows: IRow[], response:IRowResponse, currentIndex:number):IRow[] {
	const stateRows = [...rows]
	const currentRow = rows[currentIndex]
	let parentIndex = currentRow.parentId ? stateRows.findIndex(stateRow => stateRow.id === currentRow.parentId) : null

	//если новая | исправленная строка
	if(response.current){

		stateRows.splice( currentIndex, 1, //заменяем по текущему индексу
			createRow(currentRow.level, currentRow.parentId, response.current, currentRow.total)
		)
		
		if(currentRow.id === 0 && parentIndex && parentIndex >= 0){ // если новая строка и есть родитель - увеличить тотал в родителе *1
			stateRows.splice( parentIndex, 1,
				createRow(stateRows[parentIndex].level, stateRows[parentIndex].parentId, stateRows[parentIndex], stateRows[parentIndex].total+1)
			)
		}
	//если удалённая строка
	} else {
		stateRows.splice(currentIndex,1) //удаляем

		if(parentIndex && parentIndex >= 0){ // если есть родитель - уменьшить тотал в родителе *1
			stateRows.splice( parentIndex, 1,
				createRow(stateRows[parentIndex].level, stateRows[parentIndex].parentId, stateRows[parentIndex], stateRows[parentIndex].total-1)
			)
		}
		clearRows(stateRows)
	}

	//прокрутить changed
	response.changed.forEach(changedRow=>{
		const stateRowIndex = stateRows.findIndex(row => row.id === changedRow.id)
		if(stateRowIndex >= 0){
			stateRows.splice(
				stateRowIndex,
				1,
				createRow(stateRows[stateRowIndex].level, stateRows[stateRowIndex].parentId, changedRow, stateRows[stateRowIndex].total-1)
			)
		}
	})

	if(stateRows.length === 0) stateRows.push(createRow())
	return stateRows
}

// *1
// Api.getTreeRows отдаёт список, в каждом элементе(Row) которого есть total, отражающий количество прямых наследников.
// В остальных ответах Api все Row имеют поле total равное 0. Ошибка..