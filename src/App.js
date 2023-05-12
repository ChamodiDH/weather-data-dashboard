import React from 'react';
import Dashboard from './components/UI/Dashboard';
import Header from './components/UI/Header';

import './styles/styles.css';

function App() {
  return (
    <div className="main-container">
      <Header/>
      <Dashboard/>
    </div>
  );
}

export default App;
