import "./App.css";
import Map from "./components/Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1 className="text-red-500">Tailwind test</h1>
      <Router>
        <Routes>
          <Route path="/" exact element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
