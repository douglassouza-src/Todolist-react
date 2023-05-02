import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;  
    }
    html {
        font-family: 'Roboto', sans-serif;
    }
    body {
        width: 100%;
        height: 100%;
        background: #0a0f18;
        color: #fbfbfb;
    }
    .h1 {
        margin-bottom: 0.5em;
        font-size: 40px;
    }
`;
export { GlobalStyle };
