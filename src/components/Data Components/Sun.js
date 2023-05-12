import React from 'react';

const Sun = ({ sunRise, sunSet }) => {
  return (
    <div className="sunData">
      <p className="p-lw-details">Sunrise:{sunRise}</p>
      <p className="p-lw-details">Sunset:{sunSet}</p>
    </div>
  );
};

export default Sun;
