import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherCards = ({ weatherData, handleCardClick, handleCardClose }) => {
  return (
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
          cityCode={data.cityCode}
          onClick={handleCardClick}
          onClose={handleCardClose}
        />
      ))}
    </div>
  );
};

export default WeatherCards;
