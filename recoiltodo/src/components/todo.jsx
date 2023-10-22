import { useEffect } from "react";
import TodoApi from "../apis/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TODO_KEY } from "../consts/queryKey";

// 10. todo 파일 생성
const Todo = () => {
  // 10-1. useEffect 안에 즉시 실행 함수
  useEffect(() => {
    (async () => {
      const res = await TodoApi.getTodo();
      console.log("useEffect :", res.data);
    })(/* 실행문이 들어오는 위치, 매개변수 전달 가능 */);
  }, []);

  // 10-2. reactQuery 로 데이터 가져오기
  // useQuery(["queryKey"], promise 함수명);

  // 13. isError, isLoading, refetch
  const {
    data: todos,
    isError,
    isLoading,
    refetch,
  } = useQuery([TODO_KEY.GET_TODO], TodoApi.getTodo, {
    staleTime: 1000 * 60 * 4,
  });

  console.log("reactQuery :", data);

  // 17-1. mutation 으로 변경해주기
  const { mutate: addTodoMutate } = useMutation(
    (todo) => TodoApi.addTodo(todo),
    {
      onSuccess: () => {}, // 성공 시
      onError: () => {}, // 실패 시
      onSettled: () => {}, // 성공과 실패 상관 없이
    }
  );

  // 11. reactQuery에서 state를 다시 set 해야할 경우

  // reactQuery로 받아온 데이터는 자체만으로 state이기 때문에 useState로 받을 필요 X
  // 대신 queryClient의 setQueryData로 수정 가능

  const queryClient = useQueryClient();

  const onSetQuery = () => {
    // 12-2. queryKey 적용하기
    // queryClient.setQueryData([TODO_KEY.GET_TODO], (prev) => {console.log(prev);});

    // 14. refetch
    refetch();
  };

  // 15-2. 함수 만들기
  const onSubmitAddTodo = async (e) => {
    e.preventDefault();
    const { title, content } = e.target;

    // 여태까지 배운 거에 의하면...
    // await TodoApi.addTodo({ title: title.value, content: content.value });
    // refetch();

    // 17-2. mutate은 await 사용 불가, promise가 아니기 때문
    addTodoMutate({ title: title.value, content: content.value });

    // 18. refetch 대신 아래 코드 사용 가능, 쿼리 콜을 다시 한다는 것은 동일
    // 아래는 캐싱 되어 있는 데이터를 유효하지 않은 상태로 변경하는 로직.
    queryClient.invalidateQueries(TODO_KEY.GET_TODO);
  };

  // 13-2.
  if (isLoading) {
    return <div>Loading... </div>;
  }

  return (
    <div>
      {/* 16. data map으로 뿌려주기 */}
      {todos.data.map((el) => (
        <div key={el.id}>{el.title}</div>
      ))}
      {/* 15. form 만들기 */}
      <form onSubmit={onSubmitAddTodo}>
        <input name="title" />
        <textarea name="content" />
        <button>add</button>
      </form>
      <button onClick={onSetQuery}>setState</button>
    </div>
  );
};
export default Todo;
