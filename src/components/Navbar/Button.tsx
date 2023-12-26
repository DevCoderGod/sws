import React from 'react'
import S from './Navbar.module.scss'
import cn from "classnames"
import {Icon} from '../../icons'

interface IProps {
	title:string
	active:boolean
}

export function Button(props:IProps) {
	return (
		<div className={cn(S.button, props.active && S.button_active)}>
			<div className={S.icon}>{<Icon name='navPoint'/>}</div>
			<div className={S.title}>{props.title}</div>
		</div>
	)
}
