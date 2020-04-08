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
    }

    * {
        box-sizing: border-box;
    }

    #root {
        min-height: 100%;
    }

    html {
      height: 100%;
    }

    a {
        color: inherit;
        text-decoration:none;
    }

    * {
      box-sizing: inherit;
    }

    ol,
    ul {
      list-style: none;
    }
    
    input:focus{
        outline:none;
    }
`;
