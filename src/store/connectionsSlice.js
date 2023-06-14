import { createSlice } from "@reduxjs/toolkit";
import { connections } from "../constants/connections";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [...connections],
  },
  reducers: {
    addConnection: (state, action) => {
      const randomId = Math.floor(
        Math.random() * state.connections.length * 100
      );
      const newConnection = { id: randomId, ...action.payload };

      state.connections.push(newConnection);
    },

    removeConnection: (state, action) => {
      const connectionId = action.payload;
      state.connections = state.connections.filter(
        (connection) => connection.id !== connectionId
      );
    },

    updateConnection: (state, action) => {
      const { id, contactInfo } = action.payload;
      const connectionIndex = state.connections.findIndex(
        (connection) => connection.id === id
      );

      if (connectionIndex !== -1) {
        state.connections[connectionIndex] = {
          ...state.connections[connectionIndex],
          ...contactInfo,
        };
      }
    },

    favoriteConnection: (state, action) => {
      const { object, fav } = action.payload;
      const connectionIndex = state.connections.findIndex(
        (connection) => connection.id === object.id
      );

      if (connectionIndex !== -1) {
        state.connections[connectionIndex].favorite = fav;
      }
    },
  },
});

export const {
  addConnection,
  removeConnection,
  updateConnection,
  favoriteConnection,
} = connectionsSlice.actions;

export default connectionsSlice.reducer;
