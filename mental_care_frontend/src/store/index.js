import {configureStore} from "@reduxjs/toolkit";
import psychologistDetailsSlice from "./psychologistDetailsSlice";
import blogsSlice from "./blogsSlice";
import generalUsersDetailsSlice from "./generalUsersDetailsSlice";
import authUserSlice from "./authUserSlice";
import bookedPsychologistAppointmentsSlice from "./bookedPsychologistAppointmentsSlice";
import availablePsychologistAppointmentsSlice from "./availablePsychologistAppointmentsSlice";
import historyPsychologistAppointmentsSlice from "./historyPsychologistAppointmentsSlice";
const mentalCareStore=configureStore({
  reducer:{
    psychologistDetails:psychologistDetailsSlice.reducer,
    blogs:blogsSlice.reducer,
    generalUsersDetails:generalUsersDetailsSlice.reducer,
    authUser:authUserSlice.reducer,
    bookedPsychologistAppointments:bookedPsychologistAppointmentsSlice.reducer,
    availablePsychologistAppointments:availablePsychologistAppointmentsSlice.reducer,
    historyPsychologistAppointments:historyPsychologistAppointmentsSlice.reducer

  }
});
export default mentalCareStore;