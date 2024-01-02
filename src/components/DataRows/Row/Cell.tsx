import React from 'react'
import S from './Row.module.scss'
import cn from "classnames"
import { IRowBase } from '../../../models/Row.model'

export interface ICellProps extends React.PropsWithChildren {
	fieldName:keyof IRowBase,
	editable:boolean
	editing:(field:{fieldName:keyof IRowBase, value:any}) => void
	startEditing:() => void
	stopEditing:() => void
}

export function Cell(props:ICellProps) {

	const onDoubleClickHandler = () => props.startEditing()
	const onKeyDownHandler = (code:string) => code ==="Enter" && props.stopEditing()
	const onChangeHandler = (value:any) => props.editing({fieldName:props.fieldName, value})

	return (
		props.editable === false
		? 
			<div
				className={cn(S.cell)}
				onDoubleClick={onDoubleClickHandler}
			>
				{props.children}
			</div>
		:
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