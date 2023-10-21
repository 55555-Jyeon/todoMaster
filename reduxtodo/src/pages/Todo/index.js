import WelcomeButton from "components/Button";
import AddTodoModal from "./components/AddTodoModal";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "./components/TodoList";
import useModal from "hooks/use-modal";

const TodoPage = () => {
  const {
    state: isOpenAddTodoModal,
    onVisibleModal,
    onHiddenModal,
  } = useModal();

  return (
    <>
      {isOpenAddTodoModal && <AddTodoModal onClose={() => onHiddenModal()} />}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <TodoList />
          <S.ButtonBox>
            <WelcomeButton
              variant={"primary"}
              size={"full"}
              onClick={() => onVisibleModal()}
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
};
