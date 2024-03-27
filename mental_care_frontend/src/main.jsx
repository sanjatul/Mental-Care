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
import Home from "./components/shared-components/home/Home.jsx";
import Login from "./components/shared-components/login/Login.jsx";
import Signup from "./components/shared-components/signup/Signup.jsx";
import Blogs from "./components/generel-users/blogs/Blogs.jsx";
import PsycholgistProfile from "./components/generel-users/psycholgistr-profile/PsycholgistProfile.jsx";
import DoctorAppointmentForm from "./components/generel-users/psycholgist-appointment-form/PsycholgistAppointmentForm.jsx";
import AppointmentSchedule from "./components/generel-users/appointment-schedule/AppointmentSchedule.jsx";
import Dashboard from "./components/shared-components/dashboard/Dashboard.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="blogs" element={<Blogs />} />
      <Route
        path="/doctor-appointment-form"
        element={<DoctorAppointmentForm />}
      />
      <Route path="/book-appointment" element={<AppointmentSchedule />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/psycologist/:userid" element={<PsycholgistProfile />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
