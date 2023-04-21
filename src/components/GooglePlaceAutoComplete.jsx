import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import PlaceIcon from "@mui/icons-material/Place";

const GooglePlaceAutoComplete = ({ newLatlng }) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    newLatlng(coordinates);
  }, [coordinates]);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        className="w-full"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="min-w-full">
            <TextField
              style={{ width: "100%" }}
              label="Location"
              variant="outlined"
              {...getInputProps({
                placeholder: "Search Places ...",
              })}
            ></TextField>
            <div className="autocomplete-dropdown-container bg-red-200">
              {loading && <div className="text-center">Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? {
                      backgroundColor: "#cce6ff",
                      cursor: "pointer",
                      zIndex: "3",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      zIndex: "3",
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <div className="flex gap-1 justify-normal items-center">
                      <PlaceIcon fontSize="small" color="secondary" />
                      <span>{suggestion.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default GooglePlaceAutoComplete;
