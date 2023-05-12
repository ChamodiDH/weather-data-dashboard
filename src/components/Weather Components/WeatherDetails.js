import React from 'react';

import Sun from '../Data Components/Sun';
import PrsHmVs from '../Data Components/PressureHumidityVisibility';
import Wind from '../Data Components/Wind';

const WeatherDetails = ({
  city,
  date,
  speed,
  degree,
  country,
  temparature,
  description,
  tempMin,
  tempMax,
  pressure,
  humidity,
  visibility,
  sunrise,
  sunset,
  onClose,
}) => {
  const getWeatherIcon = (description) => {
    if (description.includes('clear sky')) {
      return 'clearSky';
    } else if (description.includes('overcast clouds')) {
      return 'fewClouds';
    } else if (description.includes('broken clouds')) {
      return 'brokenCloud';
    } else if (description.includes('few clouds')) {
      return 'fewClouds';
    } else if (description.includes('mist')) {
      return 'mist';
    } else if (description.includes('light rain')) {
      return 'lightRain';
    } else {
      return 'clearSky';
    }
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }

  function convertUnixTimestampToAMPM(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const sunSet = convertUnixTimestampToAMPM(sunset);
  const sunRise = convertUnixTimestampToAMPM(sunrise);
  const weatherIcon = getWeatherIcon(description);
  date = formatDate(date);

  return (
    <div className="cardc">
      <div className="header-cardc">
        <button className="close-button" onClick={onClose}>
          <div className="wind-icon">
            <img src="../assests/arrow.png" className="icon-rocket-desc" />
          </div>
        </button>

        <div className="cityDatac">
          <h4>
            {city},{country}
          </h4>
          <p className="p-timec">{date} </p>
          <div className="desc-tempc">
            <div className="descc">
              <img
                src={`../assests/${weatherIcon}.png`}
                className="icon-desc"
              />
              <p className="p-descc">{description}</p>
            </div>
            <div className="tempDatac">
              <h2>{temparature}</h2>
              <p className="p-tempc">Temp Min: {tempMin}</p>
              <p className="p-tempc">Temp Max: {tempMax}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-cardc">
        <PrsHmVs
          pressure={pressure}
          humidity={humidity}
          visibility={visibility}
        />
        <Wind speed={speed} degree={degree} />
        <Sun sunRise={sunRise} sunSet={sunSet} />
      </div>
    </div>
  );
};

export default WeatherDetails;
