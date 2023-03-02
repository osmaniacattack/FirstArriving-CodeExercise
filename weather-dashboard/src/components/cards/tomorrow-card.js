import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Tooltip, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faCloudBolt,
  faSun,
  faSnowflake,
  faCloud,
  faMoon,
  faCloudRain,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export const TomorrowCard = (props) => {
  const {
    name,
    date,
    detailedForecast,
    shortForecast,
    temperature,
    wind,
    humidity,
    index,
  } = props;

  const icons = {
    Windy: <FontAwesomeIcon icon={faWind} />,
    Thunder: <FontAwesomeIcon icon={faCloudBolt} />,
    Sun: <FontAwesomeIcon icon={faSun} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} />,
    Cloudy: <FontAwesomeIcon icon={faCloud} />,
    Clear: <FontAwesomeIcon icon={faMoon} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} />,
  };

  /*
   * This function takes a string (short forecast) as input and returns the first relevant icon by seeing if a weather key is contained within the forecast.
   * If the possible icons array is empty, a generic thermometer icon is returned.
   *
   * @param {String} short forecast - A string containing concise forecast information.
   * @returns {Icon} An icon that is either default or the first entry of an array.
   */
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

  const dateFormat = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      sx={{ width: ["80%", "40%"], p: 2, m: 2, borderRadius: "1em" }}
      index={index}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontFamily={"Kumbh Sans"}
          fontWeight={700}
          color="primary"
          sx={{ mb: 3 }}
        >
          {name}, {dateFormat(date)}
        </Typography>
        <Typography
          variant="h6"
          fontFamily={"Kumbh Sans"}
          fontWeight={700}
          color="primary"
          sx={{ m: 1 }}
        ></Typography>
        <Typography
          variant="h2"
          color="primary"
        >
          {weatherIcon(shortForecast)}
        </Typography>
        <Typography
          variant="h3"
          sx={{ m: 2 }}
          fontFamily={"Kumbh Sans"}
          fontWeight={700}
        >
          {`${temperature}°`}
        </Typography>
        <Tooltip title={detailedForecast}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontFamily={"Kumbh Sans"}
            fontWeight={400}
            sx={{
              m: 2,
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "lightgrey",
              },
            }}
          >
            {shortForecast}
          </Typography>
        </Tooltip>
        <Grid container>
          <Grid
            item
            xs={5}
          >
            <Typography
              sx={{ m: 1 }}
              fontFamily={"Kumbh Sans"}
              fontWeight={700}
            >
              <FontAwesomeIcon icon={faWind} /> Wind
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography sx={{ m: 1 }}>|</Typography>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <Typography
              sx={{ m: 1 }}
              fontFamily={"Kumbh Sans"}
              fontWeight={700}
            >
              {wind}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={5}
          >
            <Typography
              sx={{ m: 1 }}
              fontFamily={"Kumbh Sans"}
              fontWeight={700}
            >
              <FontAwesomeIcon icon={faDroplet} /> Hum
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
          >
            <Typography sx={{ m: 1 }}>|</Typography>
          </Grid>
          <Grid
            item
            xs={5}
          >
            <Typography
              sx={{ m: 1 }}
              fontFamily={"Kumbh Sans"}
              fontWeight={700}
            >
              {`${humidity.value}%`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
