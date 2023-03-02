import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import { TomorrowCard } from "./cards/tomorrow-card";

export const Weather = () => {
  const [coordinates, setCoordinates] = useState({});
  const [forecastEndpoint, setForecastEndpoint] = useState("");
  const [forecast, setForecast] = useState({});
  const [nextDayForecast, setNextDayForecast] = useState([]);

  const googleApiKey = "AIzaSyCAuE4by_lkbm5IUSXws7yJn7ua2DXG6h4";
  const address = "9555 Kings Charter Drive, Ashland VA 23005";
  const googleEndpoint = "https://maps.googleapis.com/maps/api/geocode/json";
  const weatherEndpoint = "https://api.weather.gov/points/";

  const today = new Date();

  useEffect(() => {
    async function fetchGeocode() {
      try {
        let params = {
          address: address,
          key: googleApiKey,
        };
        const response = await axios.get(`${googleEndpoint}`, { params });
        setCoordinates(response.data.results[0].geometry.location);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGeocode();
  }, []);

  useEffect(() => {
    if (coordinates !== {}) {
      async function fetchWeather() {
        try {
          const response = await axios.get(
            `${weatherEndpoint}${coordinates.lat},${coordinates.lng}`
          );
          setForecastEndpoint(response.data.properties.forecast);
        } catch (err) {
          console.log(err);
        }
      }
      fetchWeather();
    }
  }, [coordinates]);

  useEffect(() => {
    if (forecastEndpoint !== "") {
      async function getForecast() {
        try {
          const response = await axios.get(`${forecastEndpoint}`);
          setForecast(response.data.properties);
        } catch (err) {
          console.log(err);
        }
      }
      getForecast();
    }
  }, [forecastEndpoint]);

  useEffect(() => {
    /*
     * This function filters an array of dates (forecast.periods) for dates that are on the next day compared to the current date.
     *
     * @param {Array} forecast.periods - An array of Date objects representing forecast periods.
     * @returns {Array} An array of Date objects that are on the next day compared to the current date.
     * Afterwards, the nextDayForecast state is set to the returned array.
     */

    if (forecast !== {}) {
      async function getNextDayForecast() {
        try {
          let nextDayForecast = forecast.periods.filter((date) => {
            let dateDayObj = new Date(date.startTime);
            const dateDay = dateDayObj.getDate();
            const todayDay = today.getDate();
            return dateDay === todayDay + 1;
          });
          setNextDayForecast(nextDayForecast);
        } catch (err) {
          console.log(err);
        }
      }
      getNextDayForecast();
    }
  }, [forecast]);

  return (
    <>
      <Typography
        variant="h4"
        color="primary"
      >
        Tomorrow&apos;s Weather
      </Typography>
      {nextDayForecast !== []
        ? nextDayForecast.map((date, index) => {
            return (
              <TomorrowCard
                index={index}
                name={date.name}
                date={date.startTime}
                detailedForecast={date.detailedForecast}
                shortForecast={date.shortForecast}
                temperature={date.temperature}
                temperatureUnit={date.temperatureUnit}
              />
            );
          })
        : null}
    </>
  );
};
