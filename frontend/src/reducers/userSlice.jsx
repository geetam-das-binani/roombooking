import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isAuthenticated: false,

  isLoggedIn: true,
};
const userReducer = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
    },
  },
});

export const { logout, loggedInUser } = userReducer.actions;
export default userReducer;
