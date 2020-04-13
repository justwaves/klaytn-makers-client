import React from "react";
import { Helmet } from "react-helmet-async";
import { tempSetUser, check } from "redux/modules/user";
import store from "redux/store";
import Routes from "./Routes";

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
    <Helmet>
      <title>klaytn makers</title>
    </Helmet>
    <Routes />
  </>
);

export default React.memo(App);
