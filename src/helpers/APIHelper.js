import axios from 'axios';
import { API_KEY } from '../constants/dashboard_constants';
import { API_WEATHER_URL } from '../constants/dashboard_constants';

const CACHE_KEY = 'weatherData';

export const getWeatherData = async (cities) => {
  const cacheKey = CACHE_KEY;
  const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || {};

  // Check if cached data exists and has not expired
  if (cachedData.data && Date.now() - cachedData.timestamp < 300000) {
    return cachedData.data;
  } else {
    try {
      const response = await axios.get(
        `${API_WEATHER_URL}/group?id=${cities.join(
          ','
        )}&units=metric&appid=${API_KEY}`
      );

      const data = response.data;
      const weatherData = data.list.map((item) => ({
        cityCode: item.id,
        city: item.name,
        temparature: item.main.temp,
        main: item.weather[0].main,
        description: item.weather[0].description,
        date: item.dt,
        data: item,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        speed: item.wind.speed,
        degree: item.wind.deg,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        visibility: item.visibility,
        sunrise: item.sys.sunrise,
        sunset: item.sys.sunset,
        country: item.sys.country,
      }));

      // Set cached data in local storage
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: weatherData, timestamp: Date.now() })
      );

      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      throw error;
    }
  }
};
