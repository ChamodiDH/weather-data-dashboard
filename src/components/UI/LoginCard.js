import React from 'react';
import LoginButton from './LoginButton';
const LoginCard = () => {
    return (
        <div className="login">
            <h3>Login with Auth0</h3>
            <img src={require(`../../assests/user.png`)} className="user-icon" />
            <LoginButton/>
        </div>
    );
  };
  
  export default LoginCard;