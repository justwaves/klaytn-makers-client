import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { tempSetUser, check } from 'redux/modules/user';
import { walletLogin, walletLogout } from 'redux/modules/wallet';
import store from 'redux/store';
import Routes from './Routes';
import AuthModal from 'components/Common/AuthModal';
import Toast from 'components/Common/Toast';
import { checkState } from 'redux/modules/makers';
import caver from 'klaytn/caver';
// import axios from 'axios';

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function loadWallet() {
  const walletFromSession = sessionStorage.getItem('walletInstance');
  if (walletFromSession) {
    try {
      const { privateKey } = JSON.parse(walletFromSession);
      store.dispatch(walletLogin(privateKey));

      if (privateKey !== process.env.REACT_APP_PRIVATE_KEY) {
        const adminWalletInstance = caver.klay.accounts.privateKeyToAccount(
          process.env.REACT_APP_PRIVATE_KEY,
        );
        caver.klay.accounts.wallet.add(adminWalletInstance);
      }
    } catch (e) {
      store.dispatch(walletLogout());
    }
  }
}

loadUser();
loadWallet();

const App = () => {
  const { toast } = useSelector(({ ui }) => ({
    toast: ui.toast,
  }));

  useEffect(() => {
    const walletFromSession = sessionStorage.getItem('walletInstance');
    if (walletFromSession) {
      store.dispatch(checkState());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>klaytn makers</title>
      </Helmet>
      <Routes />
      <Toast toast={toast} />
      <AuthModal />
    </>
  );
};

export default App;
