// 00. 자주 사용되는 로직이라는 가정 하에 DI 진행..!

import { useQuery } from "@tanstack/react-query";
import { TODO_KEY } from "../../consts/queryKey";
import TodoApi from "../../apis/todo";

const useGetTodo = (option) => {
  return useQuery([TODO_KEY.GET_TODO], TodoApi.getTodo, {
    staleTime: 1000 * 60 * 4,
    /* suspense를 사용하려면 true, isLoading 값을 통해 로딩 화면을 처리하려면 삭제 */
    /* 보통 전체 화면 로딩 적용엔 suspense, 특정 컴포넌트에만 적용할 땐 isLoading으로 처리 */
    /* suspense: true, */
    /* 전개(spread) 연산자로 option 데이터 주기 */
    ...option,
  });
};

export default useGetTodo;
