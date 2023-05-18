import React from 'react';

const TemparatureData = ({ temparature, tempMin, tempMax }) => {
  return (
    <div className="card_tempdata">
      <h1>{Math.trunc(temparature)}&deg;C</h1>
      <h6 className="temph6">Temp Min: {Math.trunc(tempMin)}&deg;C</h6>
      <h6 className="temph6">Temp Max: {Math.trunc(tempMax)}&deg;C</h6>
    </div>
  );
};

export default TemparatureData;
