import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faPaperPlane,faCloud,faIndustry, faLemon,faBars,faTint,faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const WeatherDetails = ({index, city,date,speed,degree,country,temparature,description,tempMin,tempMax,pressure,humidity,visibility,sunrise,sunset, onClose }) => {
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
  return (
    <div >
      <div >
      <div className="card">
  <div className="card__img2">
  <button className="close-button" onClick={onClose}>  <div className="wind-icon"><FontAwesomeIcon icon={faArrowLeft} /></div></button>
  <div className="cardtitle_data">
    <h2>{city},{country}</h2>
    <h6>{formatDate(date)}</h6>
    <div className="cardweatheric">
    <div className="weather-icon">{getWeatherIcon(description)}</div>
    <h5>{description}</h5>
    </div>
    
    </div> 
  <div className = "card_tempdata">
        <h1>{temparature}&deg;C</h1>
        <h6>Temp Min: {tempMin}</h6>
        <h6>Temp Max: {tempMax}</h6>
  </div>
  </div>
<div className="card__descr-wrapper2">
    <div className="container1">
        <h6>Pressure: {pressure}Pa</h6>
        <h6>Humidity: {humidity}%</h6>
        <h6>visibility: {visibility}km</h6>
    </div>
   <div className="container2">
        <div className="wind-icon"><FontAwesomeIcon icon={faPaperPlane} /></div>
        <h6>{speed}/s {degree} Degree</h6>
   </div>
    
    <div class="container3">
        <h6>Sunrise: { convertUnixTimestampToAMPM(sunrise)}</h6>
        <h6>Sunset: {convertUnixTimestampToAMPM(sunset)}</h6>  
  </div>
  
</div>

</div>
        
      </div>
    </div>
  );
};

export default WeatherDetails;