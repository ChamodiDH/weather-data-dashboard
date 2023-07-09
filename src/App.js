import React, {useState,useEffect} from 'react';
import Dashboard from './components/UI/Dashboard';
import Header from './components/UI/Header';
import LoginCard from './components/UI/LoginCard';
import LogoutCard from './components/UI/LogoutCard';

import { useAuth0 } from '@auth0/auth0-react';

import LogoutButton from './components/UI/LogoutButton';

import './styles/styles.css';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();
 
  return (
    <div className="column">
      {!isAuthenticated && !isLoading && (<LoginCard/>)}
      {error && <p>Authentication Error: {error.message}</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
       
        <>
      
          <div className="main-container">
            
            <LogoutCard />
            <Header />
            <Dashboard/>
          </div>
        </>
      )}
    </div>
  );
}

export default App;