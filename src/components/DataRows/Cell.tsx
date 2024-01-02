import React from 'react'
import S from './DataRows.module.scss'
import cn from "classnames"
import { IRow } from '../../models/Row'

export interface ICellProps extends React.PropsWithChildren {
	fieldName:keyof IRow,
	editable:boolean
	editing:(field:{fieldName:keyof IRow, value:any}) => void
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