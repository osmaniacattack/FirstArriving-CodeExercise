import { Typography } from '@mui/material'
import * as React from 'react'

import AirIcon from '@mui/icons-material/Air';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import StormIcon from '@mui/icons-material/Storm';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import NightlightIcon from '@mui/icons-material/Nightlight';

export const Hero = () => {

// Create states for Time and Date.

// Greeting function
// time < 12pm "Good morning, {user}"
// time < sunset && time > 12pm "Good afternoon, {user}"
// time > 12pm && time < 12am "Good evening, {user}"

  return (
    <div>
        <Typography variant="h4" color="primary" textAlign="left">07:50 AM</Typography>
        <Typography variant="h6" textAlign="left">Wednesday, April 14, 2023</Typography>
        <Typography variant="h5" color="primary" textAlign="left"><WbSunnyIcon /> Good morning, Adam!</Typography>
    </div>
  )
}
