import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoAction } from "reducer/todo";

const OneTodo = ({ todo }) => {
  // 09. update & delete logic 변경하기
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const todoContentInput = useRef(null);

  const onEditTodo = () => {
    if (!isEditMode) return setIsEditMode(true);
    // 09-2. dispatch
    dispatch({
      type: todoAction.UPDATE_TODO,
      payload: {
        id: todo.id,
        content: todoContentInput.current.value,
      },
    });
    setIsEditMode(false);
  };

  const onDeleteTodo = () => {
    // 09-2. dispatch
    dispatch({
      type: todoAction.DELETE_TODO,
      payload: {
        id: todo.id,
      },
    });
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.StateBox>
          <FontAwesomeIcon icon={faCheck} />
        </S.StateBox>
        <S.Title>
          <div>{todo.title}</div>
          <div>
            <FontAwesomeIcon icon={faPen} onClick={onEditTodo} />
            <FontAwesomeIcon icon={faBan} onClick={onDeleteTodo} />
          </div>
        </S.Title>
      </S.Header>
      <S.Content>
        {isEditMode ? (
          <textarea
            defaultValue={todo.content}
            ref={todoContentInput}
          ></textarea>
        ) : (
          todo.content
        )}
      </S.Content>
    </S.Wrapper>
  );
};
export default OneTodo;

const Wrapper = styled.li`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.white};
  border: 1px solid #999;
  margin: 16px 0;
  border-radius: 8px;
  background-color: ${({ state, theme }) =>
    state ? theme.COLORS.gray[100] : theme.COLORS.white};
`;

const Header = styled.div`
  border-bottom: 1px dotted #999;
  ${flexAlignCenter};
  padding: 8px 16px;
  height: 48px;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & svg {
    cursor: pointer;
    margin-left: 16px;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const StateBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  ${flexCenter};
  color: ${({ state }) => (state ? "#3CB371" : "#999")};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  padding: 16px;
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & textarea {
    width: 100%;
    height: 100%;
    border: 1px dotted #999;
    outline: none;
    resize: none;
  }
`;

const S = {
  Wrapper,
  Header,
  StateBox,
  Title,
  Content,
};
