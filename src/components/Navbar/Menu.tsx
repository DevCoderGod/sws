import React from 'react'
import { Button } from './Button'

const list = [
	'По проекту',
	'Объекты',
	'РД',
	'МТО',
	'СМР',
	'График',
	'МиМ',
	'и т.д.',
]

const active = 'СМР'

export function Menu() {
	return (
		<>
			{list.map((item) => {
				return <Button
					title = {item}
					active = {item === active}
				/>
			})}
		</>
	)
}