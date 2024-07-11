import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./components/shared-components/home/Home.jsx";
import Login from "./components/shared-components/login/Login.jsx";
import Signup from "./components/shared-components/signup/Signup.jsx";
import Blogs from "./components/generel-users/blogs/Blogs.jsx";
import PsycholgistProfile from "./components/generel-users/psycholgist-profile/PsycholgistProfile.jsx";
import DoctorAppointmentForm from "./components/generel-users/psycholgist-appointment-form/PsycholgistAppointmentForm.jsx";
import AppointmentSchedule from "./components/generel-users/appointment-schedule/AppointmentSchedule.jsx";
import Dashboard from "./components/shared-components/dashboard/Dashboard.jsx";
import ViewDetails from "./components/generel-users/view-details/ViewDetails.jsx";
import PsycholpgistSignUp from "./components/shared-components/psychologist-signup/PsycholpgistSignUp.jsx";
import mentalCareStore from "./store/index.js";
import PersonalBlogs from "./components/psycologists/personal-blogs/PersonalBlogs.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup-user" element={<Signup />} />
      <Route path="signup-psychologist" element={<PsycholpgistSignUp />} />
      <Route path="blogs" element={<Blogs />} />
      <Route
        path="/doctor-appointment-form"
        element={<DoctorAppointmentForm />}
      />
      <Route path="/book-appointment" element={<AppointmentSchedule />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myblogs" element={<PersonalBlogs />} />
      <Route path="/psycologist/:userid" element={<ViewDetails />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={mentalCareStore}>
    <RouterProvider router={router} />
  </Provider>
);
