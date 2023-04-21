import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Header from "./Header";
import PushPinIcon from "@mui/icons-material/PushPin";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import hobbyData from "../data/hobbyData";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const Map = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [hobbies, setHobbies] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [hobbyType, setHobbyType] = useState(null);
  const [isSearchEnable, setIsSearchEnable] = useState(null);
  const [distance, setDistance] = useState(70);
  const [searchLatLng, setSearchLatLng] = useState({ lat: null, lng: null });
  const [center, setCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setHobbies(hobbyData);
    });
  }, []);

  useEffect(() => {
    setCenter(searchLatLng);
    console.log("helloj", searchLatLng);
  }, [searchLatLng]);

  useEffect(() => {
    handleSearch();
  }, [isSearchEnable]);

  const handleReset = (reset) => {
    if (reset) {
      setSelectedData(null);
      setCenter({
        lat: location?.latitude,
        lng: location?.longitude,
      });
      setDistance(40);
      setHobbyType(null);
      setHobbies(hobbyData);
      setSearchLatLng({ lat: null, lng: null });
    }
  };

  // distance start
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  // distance end

  const handleSearch = () => {
    let filterData = hobbyData.filter(
      (hobby) =>
        hobby?.type?.toLowerCase().includes(hobbyType?.toLowerCase()) &&
        // getDistanceFromLatLonInKm()
        getDistanceFromLatLonInKm(
          searchLatLng?.lat,
          searchLatLng?.lng,
          hobby.latitude,
          hobby.longitude
        ) <= distance
    );
    setHobbies(filterData);
    setIsSearchEnable(false);
  };
  const coverage = (customDistance) => {
    setDistance(customDistance);
  };

  return (
    <>
      <Header
        type={setHobbyType}
        distance={distance}
        isSeach={setIsSearchEnable}
        coverage={coverage}
        reset={handleReset}
        newSearchLatLng={setSearchLatLng}
      />

      {location.latitude && (
        <div style={{ height: "50vh" }} className="px-3">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAsprnJybW_KqoOy7cbmd9qQWx-wSxuKwU&libraries",
            }}
            defaultCenter={{
              lat: location?.latitude,
              lng: location?.longitude,
            }}
            center={center}
            defaultZoom={12}
            yesIWantToUseGoogleMapApiInternals
          >
            {hobbies?.map((hobby, index) => (
              <LocationOnIcon
                key={index}
                color={"secondary"}
                lat={hobby?.latitude}
                lng={hobby?.longitude}
                onClick={() => {
                  setSelectedData(hobby.id);
                  console.log("selectedData", hobby.id);
                }}
              />
            ))}

            {hobbies?.map((hobby, index) => {
              if (selectedData == hobby.id) {
                return (
                  <div
                    key={index}
                    lat={hobby?.latitude}
                    lng={hobby?.longitude}
                    className="bg-[#ffffff] p-3 text-center relative w-[100px] h-[60px] rounded-md "
                  >
                    <Typography
                      className="absolute left-0 right-0"
                      style={{ fontSize: "12px" }}
                    >
                      {hobby.name}
                    </Typography>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {searchLatLng?.lat ? (
              <PushPinIcon
                style={{ color: "#b00904" }}
                lat={searchLatLng?.lat}
                lng={searchLatLng?.lng}
              />
            ) : (
              <MyLocationIcon
                fontSize="large"
                color={"primary"}
                lat={location?.latitude}
                lng={location?.longitude}
              />
            )}
          </GoogleMapReact>
        </div>
      )}
      <div className="">
        {searchLatLng?.lat != null && (
          <div className="flex flex-wrap px-3 mt-5 pb-5">
            {hobbies.map((hobby, index) => (
              <Card className="md:w-1/4 sm:w-1/2 px-1" key={index}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={hobby?.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {hobby?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hobby?.description?.substring(0, 100)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
