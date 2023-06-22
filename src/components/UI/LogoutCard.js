import React from 'react';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutCard = () => {
    const {isAuthenticated } = useAuth0();
    return (
        isAuthenticated &&(
        <div className="logout">
            <img src={require(`../../assests/user.png`)} className="user-icon" />
            <LogoutButton/>
        </div>
        )
    );
  };
  
  export default LogoutCard;