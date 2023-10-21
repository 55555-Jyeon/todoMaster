// 09. create file (todoReducer)
// 나중에 MSW로 변경 예정

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      title: "example-01",
      content: "example-01",
      state: false,
    },
    {
      id: 2,
      title: "example-02",
      content: "example-02",
      state: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // switch문 사용X, 함수형으로 표현 가능해 기존의 redux보다 가독성 좋은 로직 구현 가능
    getTodo(state, action) {
      // msw 를 통해 가상 백엔드에서 불러와 state를 return
      console.log(action);
      return state;
    },
  },
});

// reducer를 통해 생성된 action exports
// 나중에 dispatch(getTodo({ ...action})) 형식으로 사용 가능
export const { getTodo } = todoSlice.actions;
