// 01. create file (__mock__ > apis > browser.js )

import { setupWorker } from "msw";
import * as TodoApi from "./apis/todo/todo.api";

// 02. TodoApi가 가진 모든 value를 복사해 배열의 요소 ( == getTodos의 값들을 배열의 요소로 지정해 API 등록)
const handler = [...Object.values(TodoApi)];

// 03. 등록된 API를 MSW에 setting
export const worker = setupWorker(...handler);
