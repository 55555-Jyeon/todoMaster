import WelcomeButton from "components/Button";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";

const AddTodoModal = ({ onAddTodo, onClose }) => {
  return (
    <S.Wrapper>
      {/* value를 가져오려면 onClick event가 아니라 form의 onSubmit event로 */}
      <S.Form onSubmit={onAddTodo}>
        <S.Title>
          <h1>ADD TODO LIST</h1>
          {/* 07. X버튼을 눌렀는데 제출이 되어버림 + 창이 사라지지 않음(onClose함수를 만들자) */}
          <button type="button" onClick={onClose}>
            X
          </button>
        </S.Title>
        <S.Content>
          <input name="title" placeholder="제목을 입력해주세요" />
          <textarea name="content" placeholder="할 일을 입력해주세요" />
          <WelcomeButton variant={"primary"} size={"full"}>
            ADD
          </WelcomeButton>
        </S.Content>
      </S.Form>
    </S.Wrapper>
  );
};
export default AddTodoModal;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Form = styled.form`
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

const Title = styled.div`
  font-size: 24px;
  ${flexAlignCenter};
  justify-content: space-between;

  & > button {
    border: none;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Content = styled.div`
  ${flexCenter};
  margin-top: 16px;
  flex-direction: column;

  & > input {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  & > textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 16px;
  }
`;

const Button = styled.button`
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.primary[300]};
  color: ${({ theme }) => theme.COLORS.fontColor};
  margin: 0 auto;
  cursor: pointer;
  :hover {
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.primary[300]};
  }
`;

const S = {
  Wrapper,
  Form,
  Content,
  Title,
  Button,
};
