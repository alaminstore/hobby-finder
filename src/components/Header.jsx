import { Button, Slider, TextField, Typography } from "@mui/material";
import React from "react";
import CurrentLocation from "./CurrentLocation";

const Header = (props) => {
  return (
    <div className="bg-pink-400">
      <Typography variant="h4" className="text-center py-2">
        H o b b y F i n d er
      </Typography>
      <TextField
        label="Seach for a hobby"
        variant="outlined"
        className="w-full"
        onChange={(e) => props.type(e.target.value)}
      ></TextField>
      <div className="flex gap-5 justify-center item-center">
        <Typography variant="h4">Distance:</Typography>
        {/* <Slider className="w-100" /> */}
        <Slider
          aria-label="Distance"
          value={props.distance}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={50}
          onChange={(e) => props.coverage(e.target.value)}
        />
      </div>
      <div>
        <Button variant="outlined" onClick={()=>props.reset(true)}>
          reset
        </Button>
        <Button onClick={() => props.isSeach(true)} variant="outlined">
          {" "}
          search
        </Button>
        <CurrentLocation />
      </div>
    </div>
  );
};

export default Header;
