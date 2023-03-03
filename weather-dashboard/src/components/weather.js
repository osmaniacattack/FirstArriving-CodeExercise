import React, { useEffect, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { Hero } from "./hero";
import { TomorrowCard } from "./cards/tomorrow-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { lastGenerated } from "./utils/dateUtils";

const GOOGLE_API_KEY = process.env.REACT_APP_API_KEY;
const ADDRESS = "9555 Kings Charter Drive, Ashland VA 23005";
const GOOGLE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";
const WEATHER_ENDPOINT = "https://api.weather.gov/points/";

export const Weather = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [forecastEndpoint, setForecastEndpoint] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [nextDayForecast, setNextDayForecast] = useState([]);
  const [updatedTime, setUpdatedTime] = useState(new Date());

  const today = new Date();

  /*
   * This function sends a formatted address string in a GET request to Google Geocode's API.
   * Expects coordinates as latitude/longitude in return.
   *
   * @params {address, api_key} forecast.periods - An array of Date objects representing forecast periods.
   * @returns {Object} A response object containing geographical data (e.g. coordinates).
   *
   * On success, move to fetchWeater() to obtain forecast endpoint
   */
  useEffect(() => {
    async function fetchGeocode() {
      try {
        let params = {
          address: ADDRESS,
          key: GOOGLE_API_KEY,
        };
        const { data } = await axios.get(`${GOOGLE_ENDPOINT}`, { params });
        setCoordinates(data.results[0].geometry.location);
      } catch (err) {
        console.log("Error fetching coordinates: ", err);
      }
    }
    fetchGeocode();
  }, []);

  /*
   * This function sends coordinates in a GET request to api.weather.gov.
   * Expects a forecast endpoint to call in future GET request in return.
   *
   * @returns {Object} A response object containing various endpoints to call based on supplied geographical data.
   *
   * On success, move to getForecast() to obtain specific forecast data
   */
  useEffect(() => {
    if (coordinates) {
      async function fetchWeather() {
        try {
          const { data } = await axios.get(
            `${WEATHER_ENDPOINT}${coordinates.lat},${coordinates.lng}`
          );
          setForecastEndpoint(data.properties.forecast);
        } catch (err) {
          console.log("Error fetching forecast endpoint: ", err);
        }
      }
      fetchWeather();
    }
  }, [coordinates]);

  /*
   * This function sends a GET request to an endpointed obtained from fetchWeather()
   * Expects forecast data.
   *
   * @returns {Object} A response object containing various forecast data for the next week.
   *
   * On success, move to getNextDayForecast() to obtain specific forecast data for the following day.
   */
  useEffect(() => {
    if (forecastEndpoint !== "") {
      async function getForecast() {
        try {
          const { data } = await axios.get(`${forecastEndpoint}`);
          setForecast(data.properties);
          setUpdatedTime(new Date());
        } catch (err) {
          console.log("Error fetching forecast data: ", err);
        }
      }
      getForecast();

      // Fetch data every 10 minutes
      const intervalId = setInterval(() => {
        getForecast();
      }, 600000);

      // Clean up the interval when component unmounts
      return () => clearInterval(intervalId);
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
      {forecast && <Hero shortForecast={forecast.periods[0].shortForecast} />}
      <Paper
        sx={{
          my: 3,
          mx: "auto",
          p: 2,
          maxWidth: "83%",
          backgroundColor: "white",
          borderRadius: "1em",
          borderColor: "lightslategrey",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          fontFamily={"Kumbh Sans"}
          fontWeight={700}
          sx={{ my: 2 }}
        >
          {`Weather Forecast`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="grey"
          fontFamily={"Kumbh Sans"}
          fontWeight={700}
          sx={{ mt: -2, mb: 2 }}
        >
          <FontAwesomeIcon icon={faLocationDot} />
          {` 9555 Kings Charter Drive, Ashland VA 23005`}
        </Typography>
        {forecast && (
          <Typography
            variant="subtitle1"
            color="grey"
            fontFamily={"Kumbh Sans"}
            fontWeight={700}
            sx={{ m: 1 }}
          >
            {`Last updated: ${lastGenerated(updatedTime)}`}
          </Typography>
        )}
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: ["column", "row"],
        }}
      >
        {nextDayForecast !== []
          ? nextDayForecast.map((date, index) => {
              return (
                <TomorrowCard
                  key={index}
                  index={index}
                  name={date.name}
                  date={date.startTime}
                  detailedForecast={date.detailedForecast}
                  shortForecast={date.shortForecast}
                  temperature={date.temperature}
                  temperatureUnit={date.temperatureUnit}
                  humidity={date.relativeHumidity}
                  wind={date.windSpeed}
                />
              );
            })
          : null}
      </Box>
    </>
  );
};
