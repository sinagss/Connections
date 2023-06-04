import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    user: null,
    userType: null,
    authError: null,
  },
  reducers: {
    logIn: (state, action) => {
      const { user } = action.payload;

      if (user) {
        state.isLoggedIn = true;
        state.userType = user.type;
        state.user = user;
        state.authError = false;
      } else {
        state.authError = true;
        state.isLoggedIn = false;
        state.userType = null;
        state.user = null;
      }
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userType = null;
      state.user = null;
    },
    signUp: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.username;
      state.userType = action.payload.userType;
    },
  },
});

export const { logIn, logOut, signUp } = authSlice.actions;

export default authSlice.reducer;
