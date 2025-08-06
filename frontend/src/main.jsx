
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import RideList from "./pages/RideList";
import RideForm from "./pages/RideForm";
import Chat from "./pages/Chat";
import './styles.css';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<RideList />} />
        <Route path="login" element={<Login />} />
        <Route path="new-ride" element={<RideForm />} />
        <Route path="chat/:rideId" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
