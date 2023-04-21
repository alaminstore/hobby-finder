import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Header from "./Header";
import PushPinIcon from "@mui/icons-material/PushPin";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
  const [distance, setDistance] = useState(40);
  const [resetAll, setResetAll] = useState(false);
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
        hobby?.name?.toLowerCase().includes(hobbyType?.toLowerCase()) &&
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
          <div className="flex flex-wrap px-3 mt-5">
            {hobbies.map((hobby, index) => (
              <Card className="md:w-1/4 sm:w-1/2 px-1" key={index}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {hobby?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
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

let hobbyData = [
  {
    id: "1",
    name: "TK MMA",
    latitude: 25.089779597788648,
    longitude: 55.15274596790836,
  },
  {
    id: "2",
    name: "UFC Gym - JBR",
    latitude: 25.08270502809145,
    longitude: 55.13996748695172,
  },
  {
    id: "3",
    name: "UFC Gym - Business Bay",
    latitude: 25.18488168235414,
    longitude: 55.27909435626708,
  },
  {
    id: "4",
    name: "Hammer Gym DMCC",
    latitude: 25.07758846370632,
    longitude: 55.14733201578764,
  },
  {
    id: "5",
    name: "Desert Barbell Sports Club",
    latitude: 25.11141067993915,
    longitude: 55.227681929280614,
  },
];

export default Map;
