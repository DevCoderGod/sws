import React from 'react'
import S from './DataRows.module.scss'
import cn from "classnames"
import { ITreeResponse } from '../../models/Row'
import { Level } from './Level'

export function Row(props:{row:ITreeResponse}) {
	return <>
		{props.row.child.length>0 && props.row.child.map(row =>
			<Row
				key={row.id}
				row={row}
			/>
		)}
		<div className={cn(S.cell)}><Level id = {props.row.id}/></div>
		<div className={cn(S.cell, S.name)}>{props.row.rowName}</div>
		<div className={cn(S.cell, S.salary)}>{props.row.salary}</div>
		<div className={cn(S.cell, S.equipment)}>{props.row.equipmentCosts}</div>
		<div className={cn(S.cell, S.Overheads)}>{props.row.overheads}</div>
		<div className={cn(S.cell, S.estimatedProfit)}>{props.row.estimatedProfit}</div>
	</>
}