import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Tooltip, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { weatherIcon } from "../utils/weatherUtils";
import { dateFormat } from "../utils/dateUtils";


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
