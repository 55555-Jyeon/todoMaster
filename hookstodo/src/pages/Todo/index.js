import WelcomeButton from "components/Button";
import AddTodoModal from "./components/AddTodoModal";
import OneTodo from "./components/OneTodo";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const TodoPage = () => {
  // 06. 게시글을 작성 완료하고 나서 modal 창을 없애야 하므로 state화하기
  // 추가 버튼을 클릭 시 다시 setIsOpenAddTodoModal(true)
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);

  // 01. todoList 추가/삭제 시 UI 변화 >> useState()
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

  // 02. onAddTodo 콜백함수로 변경 >> todoList 수정 시 title, content 를 받아오기 위해
  const onAddTodo = (title, content) =>
    // 05. 전개 연산자로 setTodoList()
    // react의 state는 참조값의 주소값이 변경되어야만 객체 상태의 변화를 인지하므로 새로운 주소값이 담긴 배열이 필요
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
        setIsOpenAddTodoModal(false);
        resolve();
      }, 3000);
    });

  const showToastMessage = (e) => {
    e.preventDefault();
    // 03. add 버튼 클릭 >> toast 메세지 >> 게시글 등록 (title, content 값 가져오기)
    // addTodoModal.js 에 input과 textarea에 name 속성 부여하기 (title, content)
    const { title, content } = e.target;
    console.log(title, content);

    toast.promise(onAddTodo(title.value, content.value), {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
  };

  return (
    <>
      {isOpenAddTodoModal && (
        /* 08. onClose 함수 추가 */
        <AddTodoModal
          onAddTodo={showToastMessage}
          onClose={() => setIsOpenAddTodoModal(false)}
        />
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            {todoList.map((todo) => (
              <OneTodo
                todo={todo}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            ))}
          </S.Content>
          <S.ButtonBox>
            <WelcomeButton
              variant={"primary"}
              size={"full"}
              onClick={() => setIsOpenAddTodoModal(true)}
            >
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
