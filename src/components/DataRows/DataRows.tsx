import React from 'react'
import S from './DataRows.module.scss'
import { Api,   } from '../../api'
import { Row } from './Row'

const titles = [
	"Уровень",
	"Наименование работ",
	"Основная з/п",
	"Оборудование",
	"Накладные расходы",
	"Сметная прибыль"
]

export function DataRows() {
	const {data} = Api.useGetRowsQuery()

	return (
		<div className={S.dataRows}>
			{titles.map(title =>
				<div 
					key={title}
					className={S.cell}
				>
					{title}
				</div>)}
			{data?.map(row =>
				<Row
					key={row.id}
					level={0}
					row={row}
				/>
			)}
		</div>
	)
}