import React from 'react';

const PressureHumidityVisibility = ({ pressure, humidity, visibility }) => {
  return (
    <div className="phvData">
      <p className="p-lw-details">Pressure:{pressure}hPa</p>
      <p className="p-lw-details">Humidity: {humidity}%</p>
      <p className="p-lw-details">Visibility:{(visibility/1000).toFixed(1)}km</p>
    </div>
  );
};

export default PressureHumidityVisibility;
