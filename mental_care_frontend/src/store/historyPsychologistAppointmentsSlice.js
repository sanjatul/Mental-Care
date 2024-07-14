import {createSlice} from "@reduxjs/toolkit";

const historyPsychologistAppointmentsSlice = createSlice({
  name: 'historyPsychologistAppointments',
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

export const historyPsychologistAppointmentsActions = historyPsychologistAppointmentsSlice.actions;

export default historyPsychologistAppointmentsSlice;