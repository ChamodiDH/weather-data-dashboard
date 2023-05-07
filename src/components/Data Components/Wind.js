import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
const Wind = ({speed,degree}) => {
  return (
    <div className="container2">
    <div className="wind-icon"><FontAwesomeIcon icon={faPaperPlane} /></div>
    <h6>{speed}/s {degree} Degree</h6>
</div>
   
  );
};

export default Wind;