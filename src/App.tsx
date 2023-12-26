import React from 'react';
import S from './App.module.scss';
import cn from "classnames"
import {Icon} from './icons/Icon'

function App() {
  return (
    <div className={S.App}>
		<div className={S.header}>
			<div className={S.icon}><Icon name='menu'/></div>
			<div className={S.icon}><Icon name='back'/></div>
			<div className={S.menu}>
				<div className={cn(S.menu__point, S.menu__point_active)}>Просмотр</div>
				<div className={S.menu__point}>Управление</div>
			</div>
			
		</div>
    </div>
  );
}

export default App;
