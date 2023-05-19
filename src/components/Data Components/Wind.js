import React from 'react';

const Wind = ({ speed, degree }) => {
  return (
    <div className="windData">
      <img src={require("../../assests/rocket.png")} className="icon-rocket-desc" />
      <p className="p-lw-details">
        {speed}m/s {degree} Degree
      </p>
    </div>
  );
};

export default Wind;
