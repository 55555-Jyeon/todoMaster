import WelcomeButton from "components/Button";
import AddTodoModal from "./components/AddTodoModal";
import OneTodo from "./components/OneTodo";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import TodoApi from "apis/todo";

const TodoPage = () => {
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  const [todoList, setTodoList] = useState([]);

  // 27.
  // useEffect 자체에 async, await 사용 불가 && Promise는 가독성X => Q. 어떻게 하면 좋을까?
  useEffect(() => {
    // A-1. async, await이 가능한 기명 함수를 내부에 만듦
    // const fetchTodos = async() => {}

    // A-2. async, await이 사용한 즉시 실행 함수
    (async () => {
      const res = await TodoApi.getTodo();
      setTodoList(res.data);
    })();
  });

  // 28. onAddTodo 로직 수정 -> TodoApi는 그 자체만으로 이미 Promise
  const onAddTodo = async (title, content) => {
    const res = await TodoApi.addTodo({ title, content });
    setTodoList([res.data, ...todoList]);
    setIsOpenAddTodoModal(false);
  };

  const showToastMessage = (e) => {
    e.preventDefault();
    const { title, content } = e.target;
    toast.promise(onAddTodo(title.value, content.value), {
      pending: "Promise is pending",
      success: "Promise resolved 👌",
      error: "Promise rejected 🤯",
    });
  };

  return (
    <>
      {isOpenAddTodoModal && (
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
