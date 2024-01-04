import React, { useRef } from 'react'
import S from './Row.module.scss'
import { IRow } from '../../../models/Row.model'
import { Level } from './Level'
import { Cell } from './Cell'
import { GetCellProps, GetLevelProps } from './Row.service'
import { ICellProps } from './Row.types'

interface IProps{
	row:IRow
	index:number
}

export function Row(props:IProps) {
	let rowRef = useRef<IRow>(props.row)
	
	const propsCell:Omit<ICellProps, 'fieldName'> = GetCellProps(props.row.id, rowRef)
	const propsLevel = GetLevelProps(props.row, props.index)

	return <>
		<div className={S.cell}>
			<Level {...propsLevel}/>
		</div>
		<Cell fieldName={'rowName'} {...propsCell}>{props.row.rowName}</Cell>
		<Cell fieldName={'salary'} {...propsCell}>{props.row.salary}</Cell>
		<Cell fieldName={'equipmentCosts'} {...propsCell}>{props.row.equipmentCosts}</Cell>
		<Cell fieldName={'overheads'} {...propsCell}>{props.row.overheads}</Cell>
		<Cell fieldName={'estimatedProfit'} {...propsCell}>{props.row.estimatedProfit}</Cell>
	</>
}