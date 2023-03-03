import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import { weatherIcon } from "./utils/weatherUtils";
import { getGreeting, lastGenerated, formatFullYear } from "./utils/dateUtils";

export const Hero = (props) => {
  const { shortForecast } = props;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Calls a new date object every minute.
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: "1em",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={800}
      >
        {lastGenerated(time)}
      </Typography>
      <Typography
        variant="h6"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={500}
      >
        {formatFullYear(time)}
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        textAlign="left"
        fontFamily={"Kumbh Sans"}
        fontWeight={700}
      >
        {weatherIcon(shortForecast)}
        {` ${getGreeting()}, Adam!`}
      </Typography>
    </Paper>
  );
};
