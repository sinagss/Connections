import { createSlice } from "@reduxjs/toolkit";
import connections from "../constants/connections";

const conCopy = [...connections];

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: conCopy,
  },
  reducers: {
    addConnection: (state, action) => {
      const randomId = Math.floor(
        Math.random() * state.connections.length * 100
      );
      const newConnetion = { id: randomId, ...action.payload };

      state.connections.push(newConnetion);
      console.log(state.connections);
    },
    removeConnection: (state, action) => {},
    editConnection: (state, action) => {},
  },
});

export const { addConnection, removeConnection, editConnection } =
  connectionsSlice.actions;

export default connectionsSlice.reducer;
