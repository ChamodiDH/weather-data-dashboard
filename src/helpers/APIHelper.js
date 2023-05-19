import axios from 'axios';
import { API_KEY } from '../constants/dashboard_constants';
import { API_WEATHER_URL } from '../constants/dashboard_constants';
import { CACHEKEY_PREFIX } from '../constants/dashboard_constants';

export const getWeatherData = async (cities) => {
  const weatherData = [];

  try {
    for (const city of cities) {
      const cityCode = city.CityCode;

      const cacheKey = `${CACHEKEY_PREFIX}-${cityCode}`;
      const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || {};

      if (
        cachedData.data &&
        Date.now() - cachedData.timestamp < city.CacheTime
      ) {
        weatherData.push(cachedData.data);
      } else {
        const response = await axios.get(
          `${API_WEATHER_URL}/weather?id=${cityCode}&units=metric&appid=${API_KEY}`
        );

        if (response.status === 200) {
          const data = response.data;

          const newData = {
            cityCode: cityCode,
            city: data.name,
            temp: data.main.temp,
            main: data.weather[0].main,
            description: data.weather[0].description,
            date: data.dt,
            data: data,
            tempMin: data.main.temp_max,
            tempMax: data.main.temp_min,
            speed: data.wind.speed,
            degree: data.wind.degree,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            visibility: data.visibility,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            country: data.sys.country,
          };

          cachedData.data = newData;
          cachedData.timestamp = Date.now();

          localStorage.setItem(cacheKey, JSON.stringify(cachedData));

          weatherData.push(newData);
        } else {
          throw new Error('Error in network response.');
        }
      }
    }

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data: ', error);
    throw error;
  }
};

export const fetchWeatherDataByCityCode = async (cityCode) => {
  const weatherData = [];
  try {
    const response = await axios.get(
      `${API_WEATHER_URL}/weather?id=${cityCode}&units=metric&appid=${API_KEY}`
    );

    if (response.status === 200) {
      const data = response.data;
      const newData = {
        cityCode: cityCode,
        city: data.name,
        temp: data.main.temp,
        main: data.weather[0].main,
        description: data.weather[0].description,
        date: data.dt,
        data: data,
        tempMin: data.main.temp_max,
        tempMax: data.main.temp_min,
        speed: data.wind.speed,
        degree: data.wind.degree,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        country: data.sys.country,
      };
      weatherData.push(newData);
      return newData;
    } else {
      throw new Error('Error in network response.');
    }
  } catch (error) {
    throw new Error('Error fetching weather data: ' + error.message);
  }
};
