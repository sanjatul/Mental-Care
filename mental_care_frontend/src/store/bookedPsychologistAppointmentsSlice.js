import {createSlice} from "@reduxjs/toolkit";

const bookedPsychologistAppointmentsSlice = createSlice({
  name: 'bookedPsychologistAppointments',
  initialState: [],
  reducers: {
    addAppointments: (state, action) => {
      return action.payload;
    },
    removeAppointments: (state, action) => {
      return state.filter(itemId => itemId !== action.payload);
    },
  }
});

export const bookedPsychologistAppointmentsActions = bookedPsychologistAppointmentsSlice.actions;

export default bookedPsychologistAppointmentsSlice;