import { IRowBase } from "../../../models/Row.model"

export interface ILevelProps {
	id:number
	level:number
	pID:number | null
	index:number
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