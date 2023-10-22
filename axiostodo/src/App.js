import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyles from "styles/global.style";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme.style";
import AuthProvider from "provider/authProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
