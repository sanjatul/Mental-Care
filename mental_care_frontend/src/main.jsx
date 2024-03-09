import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./components/shared-components/landing-page/LandingPage.jsx";
import Home from "./components/generel-users/home/Home.jsx";
import Login from "./components/shared-components/login/Login.jsx";
import Signup from "./components/shared-components/signup/Signup.jsx";
import Blogs from "./components/generel-users/blogs/Blogs.jsx";
import DoctorProfile from "./components/generel-users/doctor-profile/DoctorProfile.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="psycologist/:userid" element={<DoctorProfile />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
