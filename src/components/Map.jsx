import React from "react";
import GoogleMapReact from "google-map-react";
const Map = () => {
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAsprnJybW_KqoOy7cbmd9qQWx-wSxuKwU&libraries",
        }}
        defaultCenter={{
          lat: 10.99835602,
          lng: 77.01502627,
        }}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
