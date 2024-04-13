import {createSlice} from "@reduxjs/toolkit";
const generalUsersDetailsSlice = createSlice({
  name: 'generalUsersDetails',
  initialState: [],
  reducers: {
    addGeneralUsers: (state, action) => {
      return action.payload;
    },
    removeGeneralUser: (state, action) => {
      const updatedState = state.filter(user => user.id !== action.payload.id);
      return updatedState;
    },
  }
});

export const generalUsersDetailsActions = generalUsersDetailsSlice.actions;

export default generalUsersDetailsSlice;