import React from 'react';
import S from './App.module.scss';
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { Tabs } from './components/Tabs'

function App() {
  return (
    <div className={S.App}>
		<Header/>
		<div className={S.main}>
			<Navbar/>
			<div className={S.content}>
				<Tabs/>
			</div>
		</div>
    </div>
  );
}

export default App;
