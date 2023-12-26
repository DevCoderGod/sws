import React from 'react';
import S from './App.module.scss';
import { Header } from './components/Header'

function App() {
  return (
    <div className={S.App}>
		<Header/>
    </div>
  );
}

export default App;
