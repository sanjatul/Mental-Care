import {createSlice} from "@reduxjs/toolkit";

let user =
  {
    name: "Sanjatul Hasan Siam",
    userId:"4c059121-fd59-4487-a4c4-49362fa9bb2a",
    email: "shsiam@gmail.com",
    age: 25,
    role: "psychologist",
    gender: "Male",
    profilePicture: "",
  };

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: user,
  reducers: {
    addauthUser: (state, action) => {
      return action.payload;
    },
    removeauthUser: (state, action) => {
      return state.filter(itemId => itemId !== action.payload);
    },
  }
});

export const authUserActions = authUserSlice.actions;

export default authUserSlice;