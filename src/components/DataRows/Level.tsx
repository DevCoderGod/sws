import React from 'react'
import S from './DataRows.module.scss'
import cn from "classnames"
import { Icon } from '../../icons'
import { useActions, useAppState } from '../../store'
import { Api } from '../../api'

interface IProps {
	id:number
	level:number
}

export function Level(props:IProps) {

	const {onMouseEnterAction, onMouseLeaveAction} = useActions()
	const {onMouseEnter} = useAppState(state => state.RowLevel)
	const [deleteRow] = Api.useDeleteRowMutation()

	const onMouseEnterHandler = () => onMouseEnterAction()
	const onMouseLeaveHandler = () => onMouseLeaveAction()
	const onClickNewRowHandler = async() => {}
	const onClickTrashfillHandler = () => deleteRow(props.id)

	return (
		<div
			className={cn(S.level)}
			style={{paddingLeft:`${props.level*20}px`}}
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
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