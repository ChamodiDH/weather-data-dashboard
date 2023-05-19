import React from 'react';
import TemparatureData from '../Data Components/TemparatureData';
import Sun from '../Data Components/Sun';
import PrsHmVs from '../Data Components/PressureHumidityVisibility';
import Wind from '../Data Components/Wind';
import City from '../Data Components/City';

const WeatherCard = ({
  index,
  city,
  cityCode,
  date,
  speed,
  degree,
  country,
  temp,
  description,
  tempMin,
  tempMax,
  pressure,
  humidity,
  visibility,
  sunrise,
  sunset,
  onClick,
  onClose,
}) => {
  const handleClick = (event) => {
    if (!event.target.classList.contains('cls-btn')) {
      onClick(index);
    }
  };

  const colorClass = `color-${(index % 5) + 1}`; //returns a value btwn 1-5

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
  }; // create a new Date object with the current date and time

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options); //locale object contains string with formated date time in local format
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
    <div className="card">
      <div className={`header-card ${colorClass}`} onClick={handleClick}>
        <div className="close-buttonc">
          <button className="cls-btn" onClick={() => onClose(city)}>
            X
          </button>
        </div>
        <div className="hd">
          <City
            city={city}
            country={country}
            date={date}
            description={description}
            weatherIcon={weatherIcon}
          />
          <TemparatureData
            temp={temp}
            tempMax={tempMax}
            tempMin={tempMin}
          />
        </div>
      </div>
      <div className="lower-card">
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

export default WeatherCard;
