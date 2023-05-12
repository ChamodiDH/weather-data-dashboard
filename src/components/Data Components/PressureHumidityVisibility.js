import React from "react";

const PrsHmVs = ({pressure,humidity,visibility}) => {
  return (
    <div className="container1">
        <h6>Pressure: {pressure}Pa</h6>
        <h6>Humidity: {humidity}%</h6>
        <h6>visibility: {visibility}km</h6>
    </div>
   
  );
};

export default PrsHmVs;