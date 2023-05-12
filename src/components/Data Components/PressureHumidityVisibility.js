import React from 'react';

const PressureHumidityVisibility = ({ pressure, humidity, visibility }) => {
  return (
    <div className="phvData">
      <p className="p-lw-details">Pressure:{pressure}</p>
      <p className="p-lw-details">Humidity: {humidity}</p>
      <p className="p-lw-details">Visibility:{visibility}</p>
    </div>
  );
};

export default PressureHumidityVisibility;
