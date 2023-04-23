import { configureStore } from "@reduxjs/toolkit";
import utilReducer from "./utilSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { util: utilReducer, user: userSlice },
});
