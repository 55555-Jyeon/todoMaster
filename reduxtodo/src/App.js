import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyles from "styles/global.style";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import { store } from "store/store";
import { Provider } from "react-redux";

function App() {
  return (
    /* 02. 사용될 위치에 Provider 생성, store 전달 */
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
