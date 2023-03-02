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
    icon,
    detailedForecast,
    shortForecast,
    temperature,
    temperatureUnit,
    windSpeed,
    index,
  } = props;

  const [expanded, setExpanded] = React.useState(false);

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
      <CardMedia
        component="img"
        image={icon}
        alt="Weather Icon"
      />
      <CardContent>
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
