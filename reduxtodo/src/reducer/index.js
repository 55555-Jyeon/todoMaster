// 03. rootReducer
// create file (reducer > index.js)

import { combineReducers } from "redux";
import todo from "./todo";

// 05. todo 넣어주기
export const rootReducer = combineReducers({ todo });
