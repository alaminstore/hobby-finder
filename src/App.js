import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
function App() {
  const center = { lat: 23.7937, lng: 90.4066 };

  return (
    <div>
      <h1>Restaurants</h1>

      <RestaurantList center={center} />
    </div>
  );
}

export default App;
