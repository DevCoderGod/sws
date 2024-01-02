import React, { useEffect } from 'react'
import S from './DataRows.module.scss'
import { Api } from '../../api'
import { Row } from './Row'
import { useActions, useAppState } from '../../store'
import { getViewRows } from './DataRows.service'

const titles = ["Уровень","Наименование работ","Основная з/п","Оборудование","Накладные расходы","Сметная прибыль"]

export function DataRows() {

	const {data} = Api.useGetRowsQuery()
	const {setRowsAction} = useActions()
	
	const {rows} = useAppState(state => state.Rows)
	useEffect(() => {setRowsAction(getViewRows(data))},[data])

	return (
		<div className={S.dataRows}>
			{titles.map(title => <div key={title} className={S.title}> {title} </div>)}
			{rows.map(row => <Row key={row.id} row={row}/>)}
		</div>
	)
}