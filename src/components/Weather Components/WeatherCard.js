import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';
import TemparatureData from "../Data Components/TemparatureData";
import Sun from "../Data Components/Sun";
import PrsHmVs from "../Data Components/PrsHmVs";
import Wind from "../Data Components/Wind";
import City from "../Data Components/City";
import { faSun, faPaperPlane,faCloud,faIndustry, faLemon,faBars,faTint } from "@fortawesome/free-solid-svg-icons";

const WeatherCard = ({ index, city,cityCode,date,speed,degree,country,temparature,description,tempMin,tempMax,pressure,humidity,visibility,sunrise,sunset, onClick, onClose }) => {
  const handleClick = (event) => {
    if (!event.target.classList.contains('close-buttonc')){ onClick(index);}
   
  };

  const colorClass = `color-${index % 5 + 1}`

  const getWeatherIcon = (description) => {
    if (description.includes("clear sky")) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (description.includes("overcast clouds")) {
      return <FontAwesomeIcon icon={faCloud} />;
    }else if (description.includes("broken clouds")) {
        return <FontAwesomeIcon icon={faIndustry } />;
      }else if (description.includes("few clouds")) {
        return <FontAwesomeIcon icon={faLemon } />;
      }else if (description.includes("mist")) {
        return <FontAwesomeIcon icon={faBars } />;
      }else if (description.includes("light rain")) {
        return <FontAwesomeIcon icon={faTint } />;
      }  else {
      return <FontAwesomeIcon icon={faSun} />;
    }
  };

  ; // create a new Date object with the current date and time

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
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
   const sunSet = convertUnixTimestampToAMPM(sunset)
   const sunRise = convertUnixTimestampToAMPM(sunrise)
   const weatherIcon = getWeatherIcon(description)
   date = formatDate(date)
   
  return (
    <div>
       
    <div  className="card"  onClick={handleClick}>  
   
  <div className={`card__img ${colorClass}`}>
  <button className="close-buttonc" onClick={() => onClose(city)}>X</button>
 <City
 city={city}
 country={country}
 date={date}
 weatherIcon={weatherIcon}
 description={description}/>
  
  <TemparatureData
      temparature={temparature}
      tempMax={tempMax}
      tempMin={tempMin}/>
  </div>
<div className="card__descr-wrapper">
    <PrsHmVs
    pressure={pressure}
    humidity={humidity}
    visibility={visibility}
    />
   <Wind
   speed={speed}
   degree={degree}/>
   
    <Sun 
    sunRise={sunRise}
    sunSet={sunSet}/>
</div>
</div>
    
</div>
    
  );
};

export default WeatherCard;