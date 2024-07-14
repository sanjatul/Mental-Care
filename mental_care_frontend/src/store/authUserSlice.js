import {createSlice} from "@reduxjs/toolkit";

let user =
{
  email: "david.miller@example.com",
  userId: "2255a78c-ba32-4793-afcb-5b5348685079",
  role: "psychologist",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNTVhNzhjLWJhMzItNDc5My1hZmNiLTViNTM0ODY4NTA3OSIsImVtYWlsIjoiZGF2aWQubWlsbGVyQGV4YW1wbGUuY29tIiwicm9sZSI6InBzeWNob2xvZ2lzdCIsIm5iZiI6MTcyMDk3MTU5OCwiZXhwIjoxNzIxNTc2Mzk4LCJpYXQiOjE3MjA5NzE1OTh9.zu2QZs3GbQU0h91zGoLU3zQyy_r1McafcoZsQL7Kb70"
}

const authUserSlice = createSlice({
  name: 'authUser',
  // initialState: {},
  initialState: user,
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