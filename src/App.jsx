import React from "react";
import Routes from "./Routes";
import { tempSetUser, check } from "redux/modules/user";
import store from "redux/store";

function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log("localStorage is not working");
  }
}

loadUser();

const App = () => (
  <>
    <Routes />
  </>
);

export default React.memo(App);
