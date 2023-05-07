import React from "react";

const TemparatureData = ({temparature,tempMin,tempMax}) => {
  return (
    <div className = "card_tempdata">
        <h1>{temparature}&deg;C</h1>
        <h6>Temp Min: {tempMin}</h6>
        <h6>Temp Max: {tempMax}</h6>
  </div>
   
  );
};

export default TemparatureData;