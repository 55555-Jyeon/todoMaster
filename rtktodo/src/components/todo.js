// 12. create file (components > todo.js)

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../reducer/todo";

const Todo = () => {
  // 13.
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);

  console.log(todos);

  useEffect(() => {
    // getTodo가 type으로 지정되어 함수형으로 사용 가능, 정상적으로 reducer -> todoSlice reducer에 전달
    dispatch(getTodo({ title: "for console.log example" }));
  });

  return <>:)</>;
};
export default Todo;
