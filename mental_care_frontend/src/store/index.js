import {configureStore} from "@reduxjs/toolkit";
import psychologistDetailsSlice from "./psychologistDetailsSlice";
import blogsSlice from "./blogsSlice";
import generalUsersDetailsSlice from "./generalUsersDetailsSlice";
const mentalCareStore=configureStore({
  reducer:{
    psychologistDetails:psychologistDetailsSlice.reducer,
    blogs:blogsSlice.reducer,
    generalUsersDetails:generalUsersDetailsSlice.reducer
  }
});
export default mentalCareStore;