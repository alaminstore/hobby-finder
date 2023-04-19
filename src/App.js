
import './App.css';
import Map from "./components/Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gym from "./components/Gym";
function App() {
  return (
    <div className="App">
      <h1 className="text-red-500">Tailwind test</h1>
      <Router>
        <Routes>
          <Route path="/" exact element={<Map />} />
          <Route path="/gym/:gymId" exact element={<Gym />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
