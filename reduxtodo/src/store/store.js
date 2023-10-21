// 01. create file (store > store.js)

import { rootReducer } from "reducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

// 02. 사용될 위치에 (App.js) import
export const store = createStore(
  // 03. reducer 만들기
  rootReducer,
  process.env.NODE_ENV === "development" &&
    composeWithDevTools(applyMiddleware(logger))
);
