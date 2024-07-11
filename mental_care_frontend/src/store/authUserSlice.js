import {createSlice} from "@reduxjs/toolkit";

let user =
  {
    email: "jane.smith@example.com",
    userId: "fc39a56c-99e6-48ed-9c4a-e1cbd384c1c0",
    role: "psychologist",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjMzlhNTZjLTk5ZTYtNDhlZC05YzRhLWUxY2JkMzg0YzFjMCIsImVtYWlsIjoiamFuZS5zbWl0aEBleGFtcGxlLmNvbSIsInJvbGUiOiJwc3ljaG9sb2dpc3QiLCJuYmYiOjE3MjA3MDQxODYsImV4cCI6MTcyMTMwODk4NiwiaWF0IjoxNzIwNzA0MTg2fQ.xSGTG5bgPLPL9PP40updOL01ekmZTSL0Roy_Gn3xOBw"
  };

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