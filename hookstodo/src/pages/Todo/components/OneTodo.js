import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { useRef, useState } from "react";

// 11. setTodoList 받아오기 (변경된 내용 저장을 위해서)
// 13-2. todoList 받아오기
const OneTodo = ({ todo, todoList, setTodoList }) => {
  // 08. 게시글 edit, delete 기능 만들기
  const [isEditMode, setIsEditMode] = useState(false);
  // 10. ref 속성으로 수정 시 input value값이 변경될 수 있도록 설정
  const todoContentInput = useRef(null);

  const onEditTodo = () => {
    if (!isEditMode) return setIsEditMode(true);
    // 13. edit logic (find)
    if (window.confirm("정말 수정하시겠습니까?")) {
      // setTodoList(내가 수정한 값이 적용된 게시글을 포함한 todoList 배열)
      const _todoList = [...todoList];
      const updateTodo = _todoList.find((el) => el.id === todo.id);
      updateTodo.content = todoContentInput.current.value;
      setTodoList(_todoList);
      setIsEditMode(false);
    }
  };

  // 14. delete logic (filter)
  const onDeleteTodo = () => {
    // setTodoList(해당 데이터가 삭제된 배열)
    const deletedTodo = todoList.filter((el) => el.id !== todo.id);
    setTodoList(deletedTodo);
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
      {/* 09. 수정 true > textarea 보여주기 */}
      {/* 12. defaultValue 부여하기 */}
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
