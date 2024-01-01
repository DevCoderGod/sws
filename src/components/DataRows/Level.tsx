import React from 'react'
import S from './DataRows.module.scss'
import { Icon } from '../../icons'
import { useActions, useAppState } from '../../store'
import { Api } from '../../api'


export function Level({id}:{id:number}) {

	const {iconOnHover, iconOutHover} = useActions()
	const {onMouseEnter} = useAppState(state => state.RowLevel)
	const [deleteRow] = Api.useDeleteRowMutation()

	const onMouseEnterHandler = () => iconOnHover()
	const onMouseLeaveHandler = () => iconOutHover()
	const onClickNewRowHandler = async() => {}
	const onClickTrashfillHandler = () => deleteRow(id)

	return (
		<div
			className={S.level}
			onMouseEnter = {onMouseEnterHandler}
			onMouseLeave = {onMouseLeaveHandler}
		>
			<div
				className={S.rowIcon}
				onClick={onClickNewRowHandler}
			>
				<Icon name='row'/>
			</div>
			{onMouseEnter && 
				<div
					className={S.rowTrashfillIcon}
					onClick={onClickTrashfillHandler}
				>
					<Icon name='trashfill'/>
				</div>
			}
		</div>
	)
}