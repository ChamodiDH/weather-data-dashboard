import React from "react";

const City = ({city,date,weatherIcon,country,description}) => {
  return (
    <div className="cardtitle_data">
 
    <h2>{city},{country}</h2>
    <h6>{date}</h6>
    <div className="cardweatheric">
    <div className="weather-icon">{weatherIcon}</div>
    <h5>{description}</h5>
    </div>
    
    </div> 
   
  );
};

export default City;