import React from 'react';

const City = ({ city, date, weatherIcon, country, description }) => {
  return (
    <div className="cityData">
      <h4>
        {city}, {country}
      </h4>
      <p className="p-time">{date} </p>
      <div className="desc">
        <img src={`../assests/${weatherIcon}.png`} className="icon-desc" />
        <p className="p-desc">{description}</p>
      </div>
    </div>
  );
};

export default City;
