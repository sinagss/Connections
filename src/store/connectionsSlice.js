import { createSlice } from "@reduxjs/toolkit";
import { connections } from "../constants/connections";

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
    },
    removeConnection: (state, action) => {},
    editConnection: (state, action) => {},
    favoriteConnection: (state, action) => {
      const { object, fav } = action.payload;
      const updatedConnections = state.connections.map((connection) =>
        connection.id === object.id
          ? { ...connection, favorite: fav }
          : connection
      );

      return { ...state, connections: updatedConnections };
    },
  },
});

export const {
  addConnection,
  removeConnection,
  editConnection,
  favoriteConnection,
} = connectionsSlice.actions;

export default connectionsSlice.reducer;
