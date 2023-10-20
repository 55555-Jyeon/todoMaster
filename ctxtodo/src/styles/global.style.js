import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    // reset.css >> styled-reset library 가 존재 (npm i styled-reset)
    ${reset}
    * {
        box-sizing: border-box;
        list-style: none;
    }
    body {
        background-color: #e7e7e7;
    }
    button {
        border: none;
    }
`;

export default GlobalStyles;
