import "./App.css";
import Map from "./components/Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App px-5">
      <Router>
        <Routes>
          <Route path="/" exact element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
