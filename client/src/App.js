import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Show from "./components/show";
import Create from "./components/create";
import Update from "./components/update";
import Navbar from "./components/Navbar";
import CreateMaterial from "./components/createMaterial";

export default function App() {
  // <Show />
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Show />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/signup" element={<CreateMaterial />}></Route>
      <Route path="/update/:id" element={<Update />}></Route>
    </Routes>
    </BrowserRouter>
  );
}