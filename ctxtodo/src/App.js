import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyles from "styles/global.style";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import TodoProvider from "contexts/todo";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* 02-2. context 사용을 위해 App.js에 import */}
      <TodoProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
