// 08. create file (reducer > index.js)

import { combineReducers } from "@reduxjs/toolkit";
import { todoSlice } from "./todo";

export const rootReducer = combineReducers({
  // 10. todoReducer 등록
  todo: todoSlice.reducer,
});
