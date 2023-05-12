import React from 'react';

const Wind = ({ speed, degree }) => {
  return (
    <div className="windData">
      <img src="../assests/rocket.png" className="icon-rocket-desc" />
      <p className="p-lw-details">
        {speed}/s {degree} Degree
      </p>
    </div>
  );
};

export default Wind;