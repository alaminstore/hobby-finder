import { Button, Slider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
      <div className="flex gap-3 justify-center item-center align-middle">
        <TextField
          label="Seach for a hobby"
          variant="outlined"
          className="w-1/3"
          onChange={(e) => props.type(e.target.value)}
        ></TextField>

        <div className="w-1/3">
          <GooglePlaceAutoComplete newLatlng={setLatLng} />
        </div>

        <div className="flex flex-col w-1/2">
          <Typography className="text-[12px]">Distance(Km) :</Typography>
          <Slider
            className="p-0 m-0 w-full"
            aria-label="Distance"
            value={props.distance}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            onChange={(e) => props.coverage(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button variant="outlined" onClick={() => props.reset(true)}>
          reset
        </Button>
        <Button onClick={() => props.isSeach(true)} variant="outlined">
          {" "}
          search
        </Button>
      </div>
    </div>
  );
};

export default Header;
