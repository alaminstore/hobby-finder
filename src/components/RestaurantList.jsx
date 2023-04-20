import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  const mapStyles = {
    width: "20vw",
    height: "20vh",
    poasition: "relative",
  };

  useEffect(() => {
    const google = window.google;
    const map = new google.maps.Map(document.getElementById("map"), {
      center: props.center,
      zoom: 15,
    });
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: props.center,
      radius: 1000,
      type: ["restaurant"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setRestaurants(results);
      }
    });
  }, [props.center]);

  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={props.center}
        center={props.center}
        onClick={props.onMapClick}
      >
        <div id="map"></div>
      </Map>
      <div className="clear-both"></div>
      <div className="flex gap-3 justify-center items-center flex-wrap w-full">
        {restaurants.map((restaurant) => (
          <div key={restaurant.place_id} className="bg-orange-500 mt-3 mb-3">
            <h2>{restaurant.name}</h2>
            <p>
              <img src={restaurant.icon} className="h-8 w-auto" alt="" />
            </p>
            <p>{restaurant.vicinity}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>User Rating Total: {restaurant.user_ratings_total}</p>
          </div>
        ))}
        {console.log("restaurants", restaurants)}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsprnJybW_KqoOy7cbmd9qQWx-wSxuKwU&libraries",
})(RestaurantList);
