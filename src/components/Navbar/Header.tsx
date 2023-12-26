import React from 'react'
import S from './Navbar.module.scss'
import {Icon} from '../../icons'

export function Header() {
	return (
		<div className={S.header}>
			<div className={S.title}>
				<span>Название пректа</span>
				<span className={S.subtitle}>Аббревиатура</span>
			</div>
			<div className={S.icon}><Icon name='v'/></div>
		</div>
	)
}