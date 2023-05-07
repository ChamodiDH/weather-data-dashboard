import React from "react";
import Dashboard from "./components/UI/Dashboard";
import Header from "./components/UI/Header";

import './styles/styles.css';

function App() {
  return (
    <div className="App">
       <Header/>
     <div  className="dashboard" >
     <Dashboard />
     </div>
     
    </div>
  );
}

export default App;