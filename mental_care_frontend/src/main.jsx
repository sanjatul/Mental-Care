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
import ProfileSetting from "./components/shared-components/profile-setting/ProfileSetting.jsx";
import ChatLayeout from "./components/shared-components/chat/ChatLayeout.jsx";
import LandingPage from "./components/shared-components/landing-page/LandingPage.jsx";
import Room from "./components/shared-components/chat/Room.jsx";
import ProvideEmail from "./components/shared-components/reset-password/ProvideEmail.jsx";
import ChangePassword from "./components/psycologists/change-password/ChangePassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup-user" element={<Signup />} />
      <Route path="signup-psychologist" element={<PsycholpgistSignUp />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/forget-password" element={<ProvideEmail />} />
      <Route
        path="/doctor-appointment-form"
        element={<DoctorAppointmentForm />}
      />
      <Route path="/messages/:userid" element={<ChatLayeout />} />
      <Route path="/book-appointment" element={<AppointmentSchedule />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myblogs" element={<PersonalBlogs />} />
      <Route path="/psycologist/:userid" element={<ViewDetails />} />
      <Route path="/psycologist/:mode/:userid" element={<ViewDetails />} />
      <Route path="/profile-setting" element={<ProfileSetting />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={mentalCareStore}>
    <RouterProvider router={router} />
  </Provider>
);
