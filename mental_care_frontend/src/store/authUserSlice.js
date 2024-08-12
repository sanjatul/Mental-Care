import {createSlice} from "@reduxjs/toolkit";

let user =
{
  email: "john.doe@example.com",
  userId: "7b43e8fd-ce9f-40e0-9d12-5c22223c3f92",
  role: "user",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdiNDNlOGZkLWNlOWYtNDBlMC05ZDEyLTVjMjIyMjNjM2Y5MiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsIm5iZiI6MTcyMTQwMDc2NywiZXhwIjoxNzIyMDA1NTY2LCJpYXQiOjE3MjE0MDA3Njd9.fGaipr2lKgCNG-cTuoXWiYIVP4UFRIv_EnhGgumnY9A"
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