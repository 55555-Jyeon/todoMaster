import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import Example from "./components/example";
import Test from "./components/test";
import Todo from "./components/todo";

// 01. recoil 적용
// npm add recoil @tanstack/react-query @tanstack/react-query-devtools
// <RecoilRoot /> App.jsx에 넣기

// 07. config 관련 설정을 넣어줌
const queryClient = new QueryClient({
  // 매번 데이터를 받아온다는 의미 (기본값으로 요즘은 staleTime = 0, cacheTime = 5분(1000 * 60 * 5 (ms)) 정도로 설정 )
  defaultOptions: { queries: { staleTime: 0, cacheTime: 0 } },
});

function App() {
  return (
    // 06. tanstackQuery(react-query) 적용
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Example />
        <hr />
        <Test />
        <hr />
        <Todo />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
