// context: 전역 상태 관리 (성능 이슈 발생)
// 02. 파일 생성
import { createContext, useContext, useState } from "react";

// 02-1. 용량이 큰 component? > yes: re-render 최소화 (유지보수 < 성능 최적화)
export const TodoContext = createContext();
// 07. import를 두 번씩 하지 않기 위해 내부에서 export 하는 상수 함수 형태로 선언하기
export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  // 03. index.js에서 가져오기
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "example-todo=1",
      content: "example-todo-1",
      state: false,
    },
    {
      id: 2,
      title: "example-todo=2",
      content: "example-todo-2",
      state: false,
    },
  ]);

  // 04.
  // 흩어져 있는 Add, Delete, Update logic 가져오기, 내용 일부 수정
  const addTodo = (title, content) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setTodoList([
          {
            id: Math.floor(Math.random() * 10000),
            title,
            content,
            state: false,
          },
          ...todoList,
        ]);
        resolve();
      }, 3000);
    });

  // 04-2. 매개변수로 id 받아오기, 내용 일부 수정
  const deleteTodo = (id) => {
    const deletedTodo = todoList.filter((el) => el.id !== id);
    setTodoList(deletedTodo);
  };

  // 04-2. 매개변수로 id, content 받아오기, 내용 일부 수정
  const updateTodo = (id, content) => {
    if (window.confirm("정말 수정하시겠습니까?")) {
      const _todoList = [...todoList];
      const updateTodo = _todoList.find((el) => el.id === id);
      updateTodo.content = content;
      setTodoList(_todoList);
    }
  };

  return (
    /* 05. value를 통해 객체 형태로 내보내기 */
    <TodoContext.Provider value={{ addTodo, deleteTodo, updateTodo, todoList }}>
      {children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
