import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import People from "./pages/People";
import Home from "./pages/Home";
import Starships from "./pages/Starships";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/people" element={<PageLayout />}>
        <Route index element={<People />} />
      </Route>
      <Route path="/starships" element={<PageLayout />}>
        <Route index element={<Starships />} />
      </Route>

      <Route path="/vehicles" element={<PageLayout />}>
        <Route index element={<Vehicles />} />
      </Route>
    </Routes>
  );
}

export default App;
