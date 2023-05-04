import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        console.log('data fetching..')
        const response = await fetch("/cities.json");
        const datac = await response.json();
        let citieso = datac.List.map((city) => city.CityCode).join(",");
        const cities = citieso.split(',');
        console.log(cities)
      //const cities = ["1248991", "1850147", "2644210", "2988507", "2147714", "4930956", "1796236", "3143244"];
      const weatherData = [];
      

      for (let i = 0; i < cities.length; i++) {
        const cityCode = cities[i];
        const cacheKey = `weatherData-${cityCode}`;
        const cacheData = JSON.parse(localStorage.getItem(cacheKey));

        if (cacheData && Date.now() - cacheData.timestamp < 300000) {
          weatherData.push(cacheData.data);
        } else {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=8fc4cbf9f1b7a39b00b9f4dde541e4b3`);
          const data = await response.json();
          //console.log('the data is'+ data)
          const newData = {
            cityCode: cityCode,
            city:data.name,
            temparature: data.main.temp,
            main:data.weather[0].main,
            description: data.weather[0].description,
            date:data.dt,
            data:data,
            tempMin:data.main.temp_max,
            tempMax:data.main.temp_min,
            speed:data.wind.speed,
            degree:data.wind.degree,
            pressure:data.main.pressure,
            humidity:data.main.humidity,
            visibility:data.visibility,
            sunrise:data.sys.sunrise,
            sunset:data.sys.sunset,
            country:data.sys.country
          };

          console.log(newData)

          localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: newData }));
          weatherData.push(newData);
        }
      }

      setWeatherData(weatherData);
    };

    fetchData();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(weatherData[index]);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

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