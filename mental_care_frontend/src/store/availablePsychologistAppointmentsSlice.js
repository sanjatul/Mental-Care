import {createSlice} from "@reduxjs/toolkit";
const availablePsychologistAppointmentsSlice = createSlice({
  name: 'availablePsychologistAppointments',
  initialState: [],
  reducers: {
    addAppointments: (state, action) => {
      return action.payload;
    },
    removeAppointments: (state, action) => {
      console.log("Remove action",action.payload)
      return state.filter(appointmentId => appointmentId !== action.payload);
    },
  }
});

export const availablePsychologistAppointmentsActions = availablePsychologistAppointmentsSlice.actions;

export default availablePsychologistAppointmentsSlice;