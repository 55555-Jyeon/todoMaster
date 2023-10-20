import { styled } from "styled-components";
import OneTodo from "./OneTodo";
import { useTodo } from "contexts/todo";

// 추상화의 레벨을 같게 하라 >> index.js에는 components만 존재하도록
// map이 돌아가는 부분은 따로 빼내기

// 01. TodoList.js 파일 생성
// 02. index.js에 있던 Content 부분 가져오기, 필요한 파일 매개변수를 통해 받아오기
const TodoList = () => {
  // props drilling을 해소할 것인지 코드적으로 리팩터링을 할 것인지 고려해보기 (코드의 유지 보수 vs 코드 개선)

  // 11. todoList 불러오기
  const { todoList } = useTodo();

  return (
    <Content>
      {todoList.map((todo) => (
        <OneTodo todo={todo} />
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
