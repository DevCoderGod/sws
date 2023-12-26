import React from 'react'
import S from './Navbar.module.scss'
import { Header } from './Header'
import { Menu } from './Menu'

export function Navbar() {
	return (
		<div className={S.navbar}>
			<Header/>
			<Menu/>
		</div>
	)
}