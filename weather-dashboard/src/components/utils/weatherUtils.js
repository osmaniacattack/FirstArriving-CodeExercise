import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faCloudBolt,
  faSun,
  faSnowflake,
  faCloud,
  faMoon,
  faCloudRain,
  faTemperatureQuarter
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
  Windy: <FontAwesomeIcon icon={faWind} />,
  Thunder: <FontAwesomeIcon icon={faCloudBolt} />,
  Sun: <FontAwesomeIcon icon={faSun} />,
  Snow: <FontAwesomeIcon icon={faSnowflake} />,
  Cloudy: <FontAwesomeIcon icon={faCloud} />,
  Clear: <FontAwesomeIcon icon={faMoon} />,
  Rain: <FontAwesomeIcon icon={faCloudRain} />,
};

export const weatherIcon = (string) => {
  let possibleIcons = [];
  for (const key in icons) {
    if (string.includes(key)) {
      possibleIcons.push(icons[key]);
    }
  }
  if (possibleIcons.length > 0) {
    return possibleIcons[0];
  } else {
    return <FontAwesomeIcon icon={faTemperatureQuarter} />;
  }
};
