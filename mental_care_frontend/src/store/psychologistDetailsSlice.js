import {createSlice} from "@reduxjs/toolkit";
const psychologistDetailsSlice = createSlice({
  name: 'psychologistDetails',
  initialState: [],
  reducers: {
    addPsychologists: (state, action) => {
      // return [...state, ...action.payload]; 
      return action.payload;
    },
    approvePsychologist: (state, action) => {
      state.push(action.payload);
    },
    removePsychologist: (state, action) => {
      return state.filter(itemId => itemId !== action.payload);
    },
  }
});

export const psychologistDetailsActions = psychologistDetailsSlice.actions;

export default psychologistDetailsSlice;