import { createSlice } from "@reduxjs/toolkit";
import connections from "../constants/connections";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: connections,
  reducers: {
    addConnection: (state, action) => {},
    removeConnection: (state, action) => {},
    editConnection: (state, action) => {},
  },
});

export default connectionsSlice.reducer;
