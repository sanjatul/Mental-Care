import {createSlice} from "@reduxjs/toolkit";

const appointments = [
  {
    bookedAppointmentId: 1,
    patientId: "c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d7f",
    name: "Abdul Bashar",
    startTime: "2023-07-10T01:00:00",
    endTime: "2023-07-10T02:00:00",
    isOnline: true
  },
  {
    bookedAppointmentId: 2,
    patientId: "b33a0a2c-8c67-4c75-a1b1-9d4d69432d9f",
    name: "John Doe",
    startTime: "2023-07-09T02:00:00",
    endTime: "2023-07-09T03:00:00",
    isOnline: false
  },
  {
    bookedAppointmentId: 3,
    patientId: "5a9fd450-8ec7-4f8d-9d2f-6c5d0d8e4e7a",
    name: "Jane Smith",
    startTime: "2023-07-08T03:00:00",
    endTime: "2023-07-08T04:00:00",
    isOnline: true
  },
  {
    bookedAppointmentId: 4,
    patientId: "d15a9a67-8e3d-4f5c-bc32-7d7d8d8e3d1a",
    name: "Alice Johnson",
    startTime: "2024-07-07T04:00:00",
    endTime: "2024-07-07T05:00:00",
    isOnline: false
  },
  {
    bookedAppointmentId: 5,
    patientId: "f98b0e5c-2e12-4a90-b7e6-1c6d8e7a9f1b",
    name: "Bob Brown",
    startTime: "2024-07-08T05:00:00",
    endTime: "2024-07-08T06:00:00",
    isOnline: true
  },
  {
    bookedAppointmentId: 6,
    patientId: "c7d3b2a6-8f5c-4c70-99d2-3e4d8f8e9d0f",
    name: "Emily White",
    startTime: "2024-07-09T06:00:00",
    endTime: "2024-07-09T07:00:00",
    isOnline: true,
  },
  {
    bookedAppointmentId: 7,
    patientId: "4b0c9f9b-2f7e-4c1a-99e2-8d6d0e7a1c3d",
    name: "Michael Green",
    startTime: "2024-07-10T07:00:00",
    endTime: "2024-07-10T08:00:00",
    isOnline: false
  }
];



const bookedPsychologistAppointmentsSlice = createSlice({
  name: 'bookedPsychologistAppointments',
  initialState: appointments,
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