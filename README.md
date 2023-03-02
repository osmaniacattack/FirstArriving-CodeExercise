# FirstArriving-CodeExercise

A simple dashboard with Weather API Integration. Developed as a take-home assessment for First Arriving.

## Install Dependencies

- npx create-react-app weather-dashboard
- npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
- npm install axios (for API calls)

## Dependencies and Technologies

- React (CRA)
- Axios (API calls)
- https://www.weather.gov/documentation/services-web-api to pull data from
- https://maps.googleapis.com/maps/api/geocode/json to convert readable address to lat / long
- Material UI (React Styling library)
  -- Useful for simplified responsive design

### Objective

- Create a basic, web-based digital dashboard which displays the
  weather forecast for the following day at the First Arriving office: 9555 Kings Charter Drive, Ashland VA 23005.
- Use the API listed above to retrieve data and populate app
- Refresh weather data every 10 minutes

### API Information

- https://api.weather.gov
  -- Weather is broken up into grids.
  -- Must convert physical address >> coordinates (lat/long) >> grid(x,y)
- https://maps.googleapis.com/maps/api/geocode/json
  -- Used to convert office address into lat/long to use weather API

### Hosting

- This exercise is hosted on netlify. https://firstArriving-aqosman-weather.netlify.app
