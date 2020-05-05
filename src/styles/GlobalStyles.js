import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
    
  body {
    font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    min-height: 100%;
    min-width: 360px;
  }

  * {
    box-sizing: inherit;
  }

  input, button, textarea {
    font-family: inherit;
  }

  html, body, #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  input:focus{
    outline:none;
  }

  button:focus {
    outline: 0;
  }
`;
