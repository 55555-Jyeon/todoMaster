import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyles from "styles/global.style"; // 7. Global CSS 만들어서 적용
import { ThemeProvider } from "styled-components"; // 8. ThemeProvider import
import theme from "styles/theme.style"; // 8-2. theme={} 안에 직접 만든 theme 넣어주기

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
