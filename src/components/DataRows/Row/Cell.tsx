import React from 'react'
import S from './Row.module.scss'
import { ICellProps } from './Row.types'

export function Cell(props:ICellProps) {
	return(
		<div
			className={S.cell}
			onDoubleClick={() => props.startEditing && props.startEditing()}
			onKeyDown={(e)=> props.stopEditing && (e.code === 'Enter' || e.code === 'NumpadEnter') && props.stopEditing()}
		>{
			props.editable
				?	<input
						className={S.input}
						onChange={(e) => props.editing && props.editing(props.fieldName, e.target.value)}
						defaultValue={props.children?.toString()}
					/>
				:	props.children
		}</div>
	)
}