import {createSlice} from "@reduxjs/toolkit";

let user =
  {
    email: "shsiam@gmail.com",
    userId:"4c059121-fd59-4487-a4c4-49362fa9bb2a",
    role: "psychologist",
    token:""
  };

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: {},
  reducers: {
    addauthUser: (state, action) => {
      return action.payload;
    },
    removeauthUser: (state, action) => {
    return {};
    },
  }
});

export const authUserActions = authUserSlice.actions;

export default authUserSlice;