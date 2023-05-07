import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
import { API_KEY } from "../constants/dashboard_constants";
import { API_WEATHER_URL } from "../helpers/APIHelper";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); //error

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log("data fetching..");
        const response = await fetch("/cities.json");
        const datac = await response.json();
        let citieso = datac.List.map((city) => city.CityCode).join(",");
        const cities = citieso.split(",");
        console.log(cities);
        const weatherData = [];

      
        const cachedData = {};

       
        for (let i = 0; i < cities.length; i++) {
          const cityCode = cities[i];
          const cacheKey = `weatherData-${cityCode}`;

          
          if (cachedData[cacheKey] && Date.now() - cachedData[cacheKey].timestamp < 1000) {
            weatherData.push(cachedData[cacheKey].data);
          } else {
            const response = await fetch(`${API_WEATHER_URL}/weather?id=${cityCode}&units=metric&appid=${API_KEY}`);

            if (!response.ok) {
              throw new Error("Error in Network responsing.");
            }

            const data = await response.json();
            const newData = {
              cityCode: cityCode,
              city: data.name,
              temparature: data.main.temp,
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

            console.log(newData);

            cachedData[cacheKey] = {
              timestamp: Date.now(),
              data: newData,
            };

            weatherData.push(newData);
          }
        }

      
        setWeatherData(weatherData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const index = localStorage.getItem("selectedCardIndex");
    if (index !== null) {
      setSelectedCard(weatherData[index]);
    }
  }, [weatherData]);

  const handleCardClick = (index) => {
    localStorage.setItem("selectedCardIndex", index);
    setSelectedCard(weatherData[index]);
  };

  const handleClose = () => {
    localStorage.removeItem("selectedCardIndex");
    setSelectedCard(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {selectedCard ? (
        <WeatherDetails
          city={selectedCard.city}
          country={selectedCard.country}
          temparature={selectedCard.temparature}
          date={selectedCard.date}
          description={selectedCard.description}
          tempMin={selectedCard.tempMax}
          tempMax={selectedCard.tempMin}
          pressure={selectedCard.pressure}
          humidity={selectedCard.humidity}
          visibility={selectedCard.visibility}
          sunrise={selectedCard.sunrise}
          sunset={selectedCard.sunset}
          speed={selectedCard.speed}
          degree={selectedCard.degree}
          onClose={handleClose}
        />
      ) : (
        <div className="weather-cards-container">
          {weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              index={index}
              city={data.city}
              main={data.main}
              temparature={data.temparature}
              date={data.date}
              data={data.data}
              description={data.description}
              tempMin={data.tempMax}
              tempMax={data.tempMin}
              pressure={data.pressure}
              humidity={data.humidity}
              visibility={data.visibility}
              sunrise={data.sunrise}
              sunset={data.sunset}
              country={data.country}
              speed={data.speed}
              degree={data.degree}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;