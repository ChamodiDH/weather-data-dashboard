
import React, { useState, useEffect,useRef} from 'react';
import Sun from '../Data Components/Sun';
import PrsHmVs from '../Data Components/PressureHumidityVisibility';
import Wind from '../Data Components/Wind';
import { fetchWeatherDataByCityCode } from '../../helpers/APIHelper';




const WeatherDetails = ({
  onClose,
  cityCode
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataFetchedRef = useRef(false);

  useEffect(() => {

    const fetchData = async () => {
      if (dataFetchedRef.current) {
        return;
      }
      dataFetchedRef.current = true;
      
      setIsLoading(true);

      try {
        const data = await fetchWeatherDataByCityCode(cityCode);
        setWeatherData(data);
        console.log(weatherData)
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [cityCode]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return null; 
  }


  const sunSet = convertUnixTimestampToAMPM(weatherData.sunset);
  const sunRise = convertUnixTimestampToAMPM(weatherData.sunrise);
  const weatherIcon = getWeatherIcon(weatherData.description);
  const date = formatDate(weatherData.date);

 
  return (
    <div className="cardc">
      <div className="header-cardc">
        <button className="close-button" onClick={onClose}>
          <div className="wind-icon">
            <img src={require("../../assests/arrow.png")} className="icon-rocket-desc" />
          </div>
        </button>

        <div className="cityDatac">
          <h4>
            {weatherData.city},{weatherData.country}
          </h4>
          <p className="p-timec">{date} </p>
          <div className="desc-tempc">
            <div className="descc">
              <img
               src={require(`../../assests/${weatherIcon}.png`)}
                className="icon-desc"
              />
              <p className="p-descc">{weatherData.description}</p>
            </div>
            <div className="tempDatac">
              <h2>{Math.trunc(weatherData.temp)}&deg;C</h2>
              <p className="p-tempc">Temp Min: {Math.trunc(weatherData.tempMin)}&deg;C</p>
              <p className="p-tempc">Temp Max: {Math.trunc(weatherData.tempMax)}&deg;C</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-cardc">
        <PrsHmVs
          pressure={weatherData.pressure}
          humidity={weatherData.humidity}
          visibility={weatherData.visibility}
        />
        <Wind speed={weatherData.speed} degree={weatherData.degree} />
        <Sun sunRise={sunRise} sunSet={sunSet} />
      </div>
    </div>
  );
};

export default WeatherDetails;
