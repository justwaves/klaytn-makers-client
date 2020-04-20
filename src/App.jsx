import React from "react";
import { Helmet } from "react-helmet-async";
import { tempSetUser, check } from "redux/modules/user";
import { integrateWallet, removeWallet } from "redux/modules/wallet";
import store from "redux/store";
import Routes from "./Routes";
import MakersContract from "klaytn/contractAPI";

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

function loadWallet() {
  const walletFromSession = sessionStorage.getItem("walletInstance");
  if (walletFromSession) {
    try {
      const { privateKey } = JSON.parse(walletFromSession);
      store.dispatch(integrateWallet(privateKey));
    } catch (e) {
      store.dispatch(removeWallet());
    }
  }
}

async function loadContract() {
  console.log(MakersContract);
  const TotalMakersCount = await MakersContract.methods
    .getTotalMakersCount()
    .call();
  console.log(TotalMakersCount);
}

loadUser();
loadWallet();
loadContract();

const App = () => (
  <>
    <Helmet>
      <title>klaytn makers</title>
    </Helmet>
    <Routes />
  </>
);

export default React.memo(App);
