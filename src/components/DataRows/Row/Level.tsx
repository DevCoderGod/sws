import React from 'react'
import S from './Row.module.scss'
import cn from "classnames"
import { Icon } from '../../../icons'
import { useActions, useAppState } from '../../../store'
import { Api } from '../../../api'
import { createRow, getIndexForNewLine } from '../DataRows.service'

interface IProps {
	id:number
	level:number
	index:number
}

export function Level(props:IProps) {

	const {rows, rowEditable, mouseOverLevel} = useAppState(state => state.Rows)
	const {mouseEnterLevelAction, mouseLeaveLevelAction, addRowAction, startEditingAction} = useActions()
	const [deleteRow] = Api.useDeleteRowMutation()

	const onMouseEnterHandler = () => mouseEnterLevelAction()
	const onMouseLeaveHandler = () => mouseLeaveLevelAction()
	const onClickNewRowHandler = () => {
		if(rowEditable) return
		addRowAction({
			index: getIndexForNewLine(rows,props.index),
			newViewRow: createRow(props.level+1, props.id)
		})
		startEditingAction(0)
	}
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
			{mouseOverLevel && 
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