import {createSlice} from "@reduxjs/toolkit";

const appointments = [
  {
    appointmentId: 1,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2023-07-10T01:00:00",
    endTime: "2023-07-10T02:00:00",
    isOnline: true
  },
  {
    appointmentId: 2,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2023-07-09T02:00:00",
    endTime: "2023-07-09T03:00:00",
    isOnline: false
  },
  {
    appointmentId: 3,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2023-07-08T03:00:00",
    endTime: "2023-07-08T04:00:00",
    isOnline: true
  },
  {
    appointmentId: 4,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2024-07-07T04:00:00",
    endTime: "2024-07-07T05:00:00",
    isOnline: false
  },
  {
    appointmentId: 5,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2024-07-08T05:00:00",
    endTime: "2024-07-08T06:00:00",
    isOnline: true
  },
  {
    appointmentId: 6,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2024-07-09T06:00:00",
    endTime: "2024-07-09T07:00:00",
    isOnline: true,
  },
  {
    appointmentId: 7,
    psychologistId:"c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    startTime: "2024-07-10T07:00:00",
    endTime: "2024-07-10T08:00:00",
    isOnline: false
  }
];



const availablePsychologistAppointmentsSlice = createSlice({
  name: 'availablePsychologistAppointments',
  initialState: appointments,
  reducers: {
    addAppointments: (state, action) => {
      return action.payload;
    },
    removeAppointments: (state, action) => {
      return state.filter(appointmentId => appointmentId !== action.payload);
    },
  }
});

export const availablePsychologistAppointmentsActions = availablePsychologistAppointmentsSlice.actions;

export default availablePsychologistAppointmentsSlice;