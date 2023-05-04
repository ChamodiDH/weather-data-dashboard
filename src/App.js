import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

import './styles.css';

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