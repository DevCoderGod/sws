import { IRow, IRowBase } from "../../../models/Row.model"

export interface ILevelProps {
	index:number
	currentRow:IRow
	createNewRow:()=>void
	deleteRow:()=>void
}

export interface ICellProps extends React.PropsWithChildren {
	fieldName:keyof IRowBase
	editable:boolean
	id:number
	startEditing?:() => void
	editing?:(fieldName:keyof IRowBase, value:any) => void
	stopEditing?:() => void
}