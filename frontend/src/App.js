import { Routes, Route } from "react-router-dom";
import "./App.css";
// Main
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main */}
        <Route path="" element={<MainPage />} />
        {/* user */}
        <Route path="user" element={<Layout />}></Route>
        {/* trip */}
        <Route path="trip" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
