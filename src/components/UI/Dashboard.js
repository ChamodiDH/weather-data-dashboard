import React, { useState, useEffect, useRef } from 'react';
import WeatherCards from '../Weather Components/WeatherCards';
import WeatherDetails from '../Weather Components/WeatherDetails';
import Footer from './Footer';
import { getCitiesFromJSON } from '../../helpers/CityCodes';
import { getWeatherData } from '../../helpers/APIHelper';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      if (dataFetchedRef.current) {
        return;
      }
      dataFetchedRef.current = true;

      try {
        const cities = await getCitiesFromJSON();
        const weatherData = await getWeatherData(cities);

        setWeatherData(weatherData);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();

    timeoutId = setInterval(() => {
      fetchData();
    }, 300000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  //cache selected Item
  useEffect(() => {
    const index = localStorage.getItem('selectedCardIndex');
    if (index !== null) {
      setSelectedCard(weatherData[index]);
    }
  }, [weatherData]);

  const handleCardClick = (index) => {
    localStorage.setItem('selectedCardIndex', index);
    setSelectedCard(weatherData[index]);
  };

  const handleCardClose = (city) => {
    const newWeatherData = weatherData.filter((data) => data.city !== city);
    console.log('filtering..');
    console.log(newWeatherData);
    setWeatherData(newWeatherData);
  };

  const handleClose = () => {
    localStorage.removeItem('selectedCardIndex');
    setSelectedCard(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {selectedCard ? (
        <div className="card-container">
          <WeatherDetails
            cityCode={selectedCard.cityCode}
            onClose={handleClose}
          />
          <Footer />
        </div>
      ) : (
        <div className="main-8-squres">
          <WeatherCards
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            handleCardClose={handleCardClose}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
