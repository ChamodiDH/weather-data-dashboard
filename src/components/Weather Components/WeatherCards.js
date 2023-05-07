import React from "react";
import WeatherCard from "./WeatherCard";

const WeatherCards = ({ weatherData, onCardClick }) => {
  return (
    <div className="weather-cards-container">
      {weatherData.map((data) => (
        <WeatherCard
          key={data.id}
          data={data}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default WeatherCards;