import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { useRef, useState } from "react";
import TodoApi from "apis/todo";

const OneTodo = ({ todo, todoList, setTodoList }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const todoContentInput = useRef(null);

  const onEditTodo = async () => {
    if (!isEditMode) return setIsEditMode(true);
    if (window.confirm("정말 수정하시겠습니까?")) {
      // 29-1. 로직 추가
      const res = await TodoApi.updateTodo({
        id: todo.id,
        content: todoContentInput.current.value,
        state: todo.state,
      });

      const _todoList = [...todoList];
      const updateTodo = _todoList.find((el) => el.id === res.data.id);
      updateTodo.content = todoContentInput.current.value;
      setTodoList(_todoList);
      setIsEditMode(false);
    }
  };

  // 29-2. 로직 추가
  const onDeleteTodo = async () => {
    const res = await TodoApi.deleteTodo({ id: todo.id }); // 삭제한 todo's id
    const deletedTodo = todoList.filter((el) => el.id !== res.data.id);
    setTodoList(deletedTodo);
  };

  // 30. 낙관적 업데이트란?
  // 수정과 삭제 로직이 성공했다는 가정 하에 updateTodo, deletedTodo 진행 -> 이용자가 빠르게 데이터를 받을 수 있음
  // 확실히 하려면 getTodo를 다시 해야 함 (예외 상황을 없앨 수 있음) -> 데이터를 재요청하므로 시간이 소요
  // 백엔드와의 데이터가 항상 일치하므로 사용자는 동기화된 데이터 확인 가능

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
