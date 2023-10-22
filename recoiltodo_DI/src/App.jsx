import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import Todo from "./components/todo";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Suspense는...
// 데이터 패칭 관련 로딩 중 상태를 보여주며 reactQuery에서 suspense 옵션을 true로 설정해 사용
// 가장 가까운 suspense를 찾아가므로 보여주고 싶은 컴포넌트를 감싸고 있어야 한다. (부모로써)

// npm i react-error-boundary
// yarn add react-error-boundary

// chakara ui -> skeleton
// npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
// yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider>
        <Suspense fallback={<div>...Loading</div>}>
          <RecoilRoot>
            <ErrorBoundary fallback={<div> Ooops! error occur!</div>}>
              <Suspense fallback={<div>TodoLoading...</div>}>
                <Todo />
              </Suspense>
            </ErrorBoundary>
          </RecoilRoot>
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
