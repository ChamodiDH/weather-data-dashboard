import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
    return (
        <div className="Header-main">
            
            <h1><FontAwesomeIcon icon={faSun} /> Weather App</h1>
        </div>
       
      );
} 

export default Header;