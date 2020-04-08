import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "styles/Theme";
import GlobalStyles from "styles/GlobalStyles";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root"),
);
