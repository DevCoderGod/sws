import React from 'react';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as BackIcon } from './back.svg';
import { ReactComponent as NavIcon } from './navPoint.svg';
import { ReactComponent as RowIcon } from './row.svg';
import { ReactComponent as TrashfillIcon } from './trashfill.svg';
import { ReactComponent as VIcon } from './v.svg';

export function Icon(props:{name:'menu' | 'back' | 'navPoint' | 'row' | 'trashfill' |'v'}) {
	switch (props.name) {
		case 'menu': return <MenuIcon/>
		case 'back': return <BackIcon/>
		case 'navPoint': return <NavIcon/>
		case 'row': return <RowIcon/>
		case 'trashfill': return <TrashfillIcon/>
		case 'v': return <VIcon/>
		default: return <></>
	}
}