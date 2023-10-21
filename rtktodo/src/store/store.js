// 06. create file (store > store.js)

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducer";

export const store = configureStore({
  // 11. rootReducer 등록
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});
