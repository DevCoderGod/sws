import React, { useRef } from 'react'
import S from './DataRows.module.scss'
import cn from "classnames"
import { IRow, ITreeResponse } from '../../models/Row'
import { Level } from './Level'
import { Cell, ICellProps } from './Cell'
import { useAppState } from '../../store'
import { useActions } from '../../store'
import { Api } from '../../api'

interface IProps{
	level:number
	row:ITreeResponse
}

export function Row(props:IProps) {
	const {rowEditable} = useAppState(state => state.RowEditable)
	const {startEditingAction, stopEditingAction} = useActions()
	const [updateRow] = Api.useUpdateRowMutation()
	let rowRef = useRef<IRow>(props.row)

	const editing = (field:{fieldName:keyof IRow, value:any}) =>
		rowRef.current = {...rowRef.current, [field.fieldName]: field.value}

	const startEditing = () => startEditingAction(props.row.id)

	const stopEditing = async() => await updateRow({
		id:props.row.id,
		body:{
			...rowRef.current
		}
	}).finally(() => stopEditingAction())

	const propsCell:Omit<ICellProps, 'fieldName'> = {
		editable: rowEditable === props.row.id,
		editing,
		startEditing,
		stopEditing	
	}

	return <>
		<div className={cn(S.cell)}>
			<Level
				id = {props.row.id}
				level = {props.level}
			/>
		</div>
		<Cell fieldName={'rowName'} {...propsCell}>{props.row.rowName}</Cell>
		<Cell fieldName={'salary'} {...propsCell}>{props.row.salary}</Cell>
		<Cell fieldName={'equipmentCosts'} {...propsCell}>{props.row.equipmentCosts}</Cell>
		<Cell fieldName={'overheads'} {...propsCell}>{props.row.overheads}</Cell>
		<Cell fieldName={'estimatedProfit'} {...propsCell}>{props.row.estimatedProfit}</Cell>

		{props.row.child.length>0 && props.row.child.map(row =>
			<Row
				key = {row.id}
				level = {props.level+1}
				row = {row}
			/>
		)}
	</>
}