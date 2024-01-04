import React, { useEffect } from 'react'
import S from './DataRows.module.scss'
import { Api } from '../../api'
import { Row } from './Row'
import { useActions, useAppState } from '../../store'
import { getRows } from './DataRows.service'

const titles = ["Уровень","Наименование работ","total","Основная з/п","Оборудование","Накладные расходы","Сметная прибыль"]

export function DataRows() {

	const {data} = Api.useGetRowsQuery()
	const {setRowsAction, startEditingAction} = useActions()
	
	const {rows} = useAppState(state => state.Rows)
	useEffect(() => {
		setRowsAction(getRows(data))
		data?.length === 0 && startEditingAction(0)
	},[data])

	return (
		<div className={S.dataRows}>
			{titles.map(title => <div key={title} className={S.title}> {title} </div>)}
			{rows.map((row, i) => <Row key={row.id} row={row} index={i}/>)}
		</div>
	)
}