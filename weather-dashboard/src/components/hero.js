import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faCloudBolt,
  faSun,
  faSnowflake,
  faCloud,
  faMoon,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export const Hero = (props) => {
  const { shortForecast } = props;
  const [time, setTime] = useState(new Date());
  const icons = {
    Windy: <FontAwesomeIcon icon={faWind} />,
    Thunder: <FontAwesomeIcon icon={faCloudBolt} />,
    Sun: <FontAwesomeIcon icon={faSun} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} />,
    Cloudy: <FontAwesomeIcon icon={faCloud} />,
    Clear: <FontAwesomeIcon icon={faMoon} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} />,
  };

  const weatherIcon = (string) => {
    let possibleIcons = [];
    for (const key in icons) {
      if (string.includes(key)) {
        possibleIcons.push(icons[key]);
      }
    }
    if (possibleIcons) {
      return possibleIcons[0];
    } else {
      return <DeviceThermostatIcon />;
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function getGreeting() {
    const hour = time.getHours();
    if (hour >= 6 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <Box>
      <Typography
        variant="h4"
        color="primary"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={800}
      >
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Typography>
      <Typography
        variant="h6"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={500}
      >
        {time.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={700}
      >
        {weatherIcon(shortForecast)}{` ${getGreeting()}, Adam!`}
      </Typography>
    </Box>
  );
};
