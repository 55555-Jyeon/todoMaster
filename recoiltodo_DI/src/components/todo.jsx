import { useQueryClient } from "@tanstack/react-query";
import { TODO_KEY } from "../consts/queryKey";
import useAddTodo from "../hooks/queries/add-todo";
import useGetTodo from "../hooks/queries/get-todo";
import { Skeleton } from "@chakra-ui/react";

const Todo = () => {
  const queryClient = useQueryClient();

  // 01. add-todo & get-todo DI 적용하기
  const { data: todos, isLoading } = useGetTodo();
  const { mutateAsync: addTodoMutation } = useAddTodo();

  const onSubmitAddTodo = async (e) => {
    e.preventDefault();
    const { title, content } = e.target;
    await addTodoMutation({ title: title.value, content: content.value });
    queryClient.invalidateQueries(TODO_KEY.GET_TODO);
  };

  if (isLoading) {
    // App.jsx에 suspense에 적용할 수도 있지만 이 부분에 Skeleton을 적용하는 것을 더 추천 (단, suspense 제거 필수)
    return <Skeleton height="80px" width="300px" />;
  }

  return (
    <div>
      {todos.data.map((el) => (
        <div key={el.id}>{el.title}</div>
      ))}
      <form onSubmit={onSubmitAddTodo}>
        <input name="title" />
        <textarea name="content" />
        <button>add</button>
      </form>
    </div>
  );
};

export default Todo;
