import React from 'react'
import S from './DataRows.module.scss'
import cn from "classnames"
import { Icon } from '../../icons'
import { useActions, useAppState } from '../../store'

export function Level() {

	const {iconOnHover, iconOutHover} = useActions()
	const {onMouseEnter} = useAppState(state => state.RowLevel)

	const onMouseEnterHandler = () => iconOnHover()
	const onMouseLeaveHandler = () => iconOutHover()

	return (
		<div
			className={S.level}
			onMouseEnter = {onMouseEnterHandler}
			onMouseLeave = {onMouseLeaveHandler}
		>
			<Icon name='row'/>
			{onMouseEnter && <Icon name='trashfill'/>}
		</div>
	)
}