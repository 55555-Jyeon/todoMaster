import WelcomeButton from "components/Button";
import AddTodoModal from "./components/AddTodoModal";
import OneTodo from "./components/OneTodo";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoPage = () => {
  // 01. 변수 생성
  const isOpenAddTodoModal = true;

  // 03. mock data 생성 >> map 돌려서 반복되는 UI 처리
  const todoList = [
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
  ];

  // 04. toast library handle을 위한 함수  >> 3000s 뒤에 성공시켜라
  // backend와의 데이터 통신을 유사하게 구현하기 위한 빈 껍데기뿐인 promise
  const onAddTodo = new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  });

  // 05. toast message >> AddTodoModal의 add 버튼 클릭 시 생성
  // 그러나 해당 함수는 향후 훅함수 이용에 있어 반드시 index.js에 작성 (함수 생성해서 자식 컴포넌트에 전달)
  // index.js(부모)에서 생성된 함수를 props로 전달해 AddTodoModal에서 사용
  const showToastMessage = (e) => {
    e.preventDefault();
    toast.promise(onAddTodo, {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
  };

  return (
    <>
      {/* 02. 삼항 연산자 사용. true일 때만 보여주기 >> component화하기 */}
      {/* 05-2. 자식 component한테 함수 전달 */}
      {isOpenAddTodoModal && <AddTodoModal onAddTodo={showToastMessage} />}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            {todoList.map((todo) => (
              /* OneTodo에 필요한 todo 정보를 속성값으로 전달 >> 자식 component는 이를 매개변수로 받음 */
              <OneTodo todo={todo} />
            ))}
          </S.Content>
          <S.ButtonBox>
            <WelcomeButton variant={"primary"} size={"full"}>
              추가
            </WelcomeButton>
          </S.ButtonBox>
        </S.Container>
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </S.Wrapper>
    </>
  );
};
export default TodoPage;

const Wrapper = styled.div`
  height: 100vh;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.COLORS.primary[300]};
  color: ${({ theme }) => theme.COLORS.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};
