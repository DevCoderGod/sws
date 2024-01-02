import React, { useRef } from 'react'
import S from './Row.module.scss'
import cn from "classnames"
import { IRow } from '../../../models/Row.model'
import { Level } from './Level'
import { Cell, ICellProps } from './Cell'
import { useAppState } from '../../../store'
import { useActions } from '../../../store'
import { Api } from '../../../api'

interface IProps{
	row:IRow
}

export function Row(props:IProps) {
	const {rowEditable} = useAppState(state => state.Rows)
	const {startEditingAction, stopEditingAction} = useActions()
	const [updateRow] = Api.useUpdateRowMutation()
	const [createRow] = Api.useCreateRowMutation()
	let rowRef = useRef<IRow>(props.row)

	const propsCell:Omit<ICellProps, 'fieldName'> =
	rowEditable === props.row.id
	?	{
			editable: true,
			editing: (field:{fieldName:keyof IRow, value:any}) => {
				rowRef.current = {...rowRef.current, [field.fieldName]: field.value}
			},
			stopEditing: async() => {
				props.row.id > 0
				?	await updateRow({
						id:props.row.id,
						body:{
							...rowRef.current
						}
					}).finally(() => stopEditingAction())
				:	await createRow(rowRef.current)
			}
		}
	:	{
			editable: false,
			startEditing: () => startEditingAction(props.row.id)
		}
	

	return <>
		<div className={cn(S.cell)}>
			<Level
				id={props.row.id}
				level={props.row.level}
			/>
		</div>
		<Cell fieldName={'rowName'} {...propsCell}>{props.row.rowName}</Cell>
		<Cell fieldName={'salary'} {...propsCell}>{props.row.salary}</Cell>
		<Cell fieldName={'equipmentCosts'} {...propsCell}>{props.row.equipmentCosts}</Cell>
		<Cell fieldName={'overheads'} {...propsCell}>{props.row.overheads}</Cell>
		<Cell fieldName={'estimatedProfit'} {...propsCell}>{props.row.estimatedProfit}</Cell>
	</>
}