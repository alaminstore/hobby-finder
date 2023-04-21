import { Button, Slider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrentLocation from "./CurrentLocation";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";

const Header = (props) => {
  const [latLng, setLatLng] = useState(null);

  useEffect(() => {
    props.newSearchLatLng(latLng);
  }, [latLng]);

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

      <GooglePlaceAutoComplete newLatlng={setLatLng} />

      <div className="flex gap-5 justify-center item-center">
        <Typography variant="h4">Distance:</Typography>

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
        <Button variant="outlined" onClick={() => props.reset(true)}>
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
