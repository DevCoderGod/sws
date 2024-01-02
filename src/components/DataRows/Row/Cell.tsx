import React from 'react'
import S from './Row.module.scss'
import cn from "classnames"
import { IRowBase } from '../../../models/Row.model'

export interface ICellProps extends React.PropsWithChildren {
	fieldName:keyof IRowBase
	editable:boolean
	startEditing?:() => void
	editing?:(field:{fieldName:keyof IRowBase, value:any}) => void
	stopEditing?:() => void
}

export function Cell(props:ICellProps) {

	if(!props.editable){
		const onDoubleClickHandler = () => props.startEditing && props.startEditing()
		
		return(
			<div
				className={cn(S.cell)}
				onDoubleClick={onDoubleClickHandler}
			>
				{props.children}
			</div>
		)
	} else {
		const onKeyDownHandler = (code:string) =>
			((code === 'Enter' || code === 'NumpadEnter') && props.stopEditing) && props.stopEditing()

		const onChangeHandler = (value:any) =>
			props.editing && props.editing({fieldName:props.fieldName, value})

		return(
			<div
				className={cn(S.cell)}
				onKeyDown={(e)=> onKeyDownHandler(e.code)}
			>
				<input
					className={S.input}
					onChange={(e) => onChangeHandler(e.target.value)}
					defaultValue={props.children?.toString()}
				/>
			</div>
		)
	}
}