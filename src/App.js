import React from "react";
import "./styles/App.css"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import CharacterPage from "./pages/CharacterPage";
import EpisodePage from "./pages/EpisodePage";
import LocationPage from "./pages/LocationPage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="*" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterPage />} />
      <Route path="/episodes/:id" element={<EpisodePage />} />
      <Route path="/locations/:id" element={<LocationPage />} />
    </Routes>
  </BrowserRouter>
      
  )
}

export default App;
