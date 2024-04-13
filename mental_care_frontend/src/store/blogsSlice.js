import {createSlice} from "@reduxjs/toolkit";
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlogs: (state, action) => {
      // return [...state, ...action.payload]; 
      return action.payload;
    },
    updateBlogs: (state, action) => {
      state.push(action.payload);
    },
    removeBlogs: (state, action) => {
      return state.filter(itemId => itemId !== action.payload);
    },
  }
});

export const blogsActions = blogsSlice.actions;

export default blogsSlice;