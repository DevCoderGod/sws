import React from 'react'
import S from './Row.module.scss'
import cn from "classnames"
import { Icon } from '../../../icons'
import { useActions, useAppState } from '../../../store'
import { ILevelProps } from './Row.types'

export function Level(props:ILevelProps) {

	const {rows, rowEditable, mouseOverLevel} = useAppState(state => state.Rows)
	const {mouseEnterLevelAction, mouseLeaveLevelAction} = useActions()

	const onMouseEnterHandler = () => mouseEnterLevelAction()
	const onMouseLeaveHandler = () => mouseLeaveLevelAction()
	const onClickNewRowHandler = () => rowEditable === null && props.createNewRow()
	const onClickTrashfillHandler = () => rowEditable === null && props.deleteRow()

	const {currentRow} = props
	const multiplier = props.index - rows.findIndex(row => row.id === currentRow.parentId) - 1

	return (
		<div
			className={S.level}
			style={{paddingLeft:`${currentRow.level*20}px`}}
		>
			<div
				className={cn(S.container, mouseOverLevel && S.container_hover)}
				onMouseEnter={onMouseEnterHandler}
				onMouseLeave={onMouseLeaveHandler}
			>
				<div
					className={S.rowIcon}
					onClick={onClickNewRowHandler}
				>
					{currentRow.parentId && <div className={cn(S.line, S.left)}></div>}
					{currentRow.parentId && <div 
						className={cn(S.line, S.up)}
						style={{
							height:`${52 + multiplier*60}px`,
							top:`${-40 - multiplier*60}px`
						}}
					></div>}
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
		</div>
	)
}