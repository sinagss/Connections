import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import connectionsSlice from "./connectionsSlice";

const store = configureStore({
  reducer: { authenticator: authSlice, connections: connectionsSlice },
});

export default store;
