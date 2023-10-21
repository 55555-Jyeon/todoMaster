import { styled } from "styled-components";
import OneTodo from "./OneTodo";
// import { useTodo } from "contexts/todo"; >> useTodo를 useSelector로 변경해주기
import { useSelector } from "react-redux";

const TodoList = () => {
  // 07. useSelector
  const todoList = useSelector((state) => state.todo);

  return (
    <Content>
      {todoList.map((todo) => (
        <OneTodo key={"todo" + todo.id} todo={todo} />
      ))}
    </Content>
  );
};
export default TodoList;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
