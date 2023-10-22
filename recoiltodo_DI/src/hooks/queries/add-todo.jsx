import { useMutation } from "@tanstack/react-query";
import TodoApi from "../../apis/todo";

const useAddTodo = () => {
  return useMutation((todo) => TodoApi.addTodo(todo), {
    // 성공 시
    onSuccess: () => {
      alert("todo가 list에 등록되었습니다.");
    },
    // 실패 시
    onError: () => {
      alert("list 등록에 실패했습니다.");
    },
    // 성공과 실패 상관 없이
    onSettled: () => {
      alert("로직이 실행되었습니다.");
    },
  });
};
export default useAddTodo;
