import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import connectionsSlice from "./connectionsSlice";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const connectionsPersistConfig = {
  key: "connections",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedConnectionsReducer = persistReducer(
  connectionsPersistConfig,
  connectionsSlice
);

const rootReducer = {
  authenticator: persistedAuthReducer,
  connections: persistedConnectionsReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
