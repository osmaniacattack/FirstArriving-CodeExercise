import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AirIcon from "@mui/icons-material/Air";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import NightlightIcon from "@mui/icons-material/Nightlight";
import ShowerIcon from "@mui/icons-material/Shower";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const TomorrowCard = (props) => {
  const {
    name,
    date,
    detailedForecast,
    shortForecast,
    temperature,
    temperatureUnit,
    index,
  } = props;

  const [expanded, setExpanded] = React.useState(false);
  const icons = {
    Windy: <AirIcon />,
    Thunder: <ThunderstormIcon />,
    Sun: <WbSunnyIcon />,
    Snow: <AcUnitIcon />,
    Cloudy: <CloudIcon />,
    Clear: <NightlightIcon />,
    Rain: <ShowerIcon />,
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateFormat = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      index={index}
    >
      <CardHeader
        title={name}
        subheader={`${dateFormat(date)}`}
      />
      <CardContent>
        <Typography variant="h2">{weatherIcon(shortForecast)}</Typography>
        <Typography
          variant="h5"
          color="primary"
        >
          {`${temperature} °${temperatureUnit}`}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          {shortForecast}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>{detailedForecast}</CardContent>
      </Collapse>
    </Card>
  );
};
