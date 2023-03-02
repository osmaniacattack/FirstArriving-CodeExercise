import React, { useEffect, useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [coordinates, setCoordinates] = useState({});

  const googleApiKey = "AIzaSyCAuE4by_lkbm5IUSXws7yJn7ua2DXG6h4";
  const address = "9555 Kings Charter Drive, Ashland VA 23005";
  const googleEndpoint = "https://maps.googleapis.com/maps/api/geocode/json";
  const weatherEndpoint = "https://api.weather.gov/points/";

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
    if (coordinates) {
      async function fetchWeather() {
        try {
          const response = await axios.get(
            `${weatherEndpoint}${coordinates.lat},${coordinates.lng}`
          );
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchWeather();
    }
  }, [coordinates]);

  return <div>Weather data should appear here</div>;
};
