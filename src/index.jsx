import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/GlobalStyles";
import Theme from "styles/Theme";
import store from "redux/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
