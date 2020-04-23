import React from "react";
import { Helmet } from "react-helmet-async";
import { tempSetUser, check } from "redux/modules/user";
import { walletLogin, walletLogout } from "redux/modules/wallet";
import store from "redux/store";
import Routes from "./Routes";
import contractAPI from "klaytn/contractAPI";
import AuthModal from "components/Common/AuthModal";

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
      store.dispatch(walletLogin(privateKey));
    } catch (e) {
      store.dispatch(walletLogout());
    }
  }
}

async function loadContract() {
  console.log(contractAPI);
  const TotalMakersCount = await contractAPI.methods
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
    <AuthModal />
  </>
);

export default React.memo(App);
