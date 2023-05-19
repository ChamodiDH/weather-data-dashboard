import React from 'react';
const Header = () => {
  return (
    <div className="main-header">
      <img src={require('../../assests/headericon.png')} className="header-icon" />
      <h1>Weather App</h1>
    </div>
  );
};

export default Header;
