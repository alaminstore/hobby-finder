import { Button, Slider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Header = (props) => {
  const [latLng, setLatLng] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    props.newSearchLatLng(latLng);
    props.searchAdds(address);
  }, [latLng, address]);

  return (
    <div className="px-3">
      <Typography variant="h4" component="div" className="text-center py-5">
        H o b b y F i n d er
      </Typography>

      <div className="flex gap-3 mt-5 justify-center item-center align-middle">
        <TextField
          label="Seach for a hobby"
          variant="outlined"
          className="w-1/3"
          onChange={(e) => props.type(e.target.value)}
        ></TextField>

        <div className="w-1/3">
          <GooglePlaceAutoComplete newLatlng={setLatLng} placeAddress={setAddress} />
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

      <div className="flex justify-center gap-1  my-3">
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => props.reset(true)}
          startIcon={<RestartAltIcon fontSize="small" />}
        >
          reset Map
        </Button>
        <Button
          onClick={() => props.isSeach(true)}
          variant="contained"
          size="small"
          startIcon={<SendIcon fontSize="small" />}
        >
          search
        </Button>
      </div>
    </div>
  );
};

export default Header;
