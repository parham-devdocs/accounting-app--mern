// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./reducers/userInfo"; // Adjust the path as necessary
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig,userInfoReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
});

export const persistor = persistStore(store);
