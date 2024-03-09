import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DoctorProfile from "./components/DoctorProfile";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
}

export default App;
