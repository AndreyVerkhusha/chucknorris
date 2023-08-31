import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainReducer";

export const store = configureStore({
  reducer: mainReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
