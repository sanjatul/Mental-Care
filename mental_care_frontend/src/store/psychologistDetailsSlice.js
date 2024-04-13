import {createSlice} from "@reduxjs/toolkit";
const psychologistDetailsSlice = createSlice({
  name: 'psychologistDetails',
  initialState: [],
  reducers: {
    addPsychologists: (state, action) => {
      return action.payload;
    },
    approvePsychologist: (state, action) => {
      const updatedState = state.map(psychologist => {
        if (psychologist.userId === action.payload.userId) {
            return {
                ...psychologist,
                isApproved: true
            };
        }
        return psychologist;
    });
    return updatedState;
    },
    removePsychologist: (state, action) => {
      const updatedState = state.filter(psychologist => psychologist.userId !== action.payload.userId);
      return updatedState;
    },
  }
});

export const psychologistDetailsActions = psychologistDetailsSlice.actions;

export default psychologistDetailsSlice;