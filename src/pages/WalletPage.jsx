import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Header from "components/Header/Header";
import WalletViewerContainer from "components/Wallet/WalletViewer/WalletViewerContainer";

const WalletPage = () => {
  const history = useHistory();
  const { hasWallet, username } = useSelector(({ wallet, user }) => ({
    hasWallet: wallet.hasWallet,
    username: user.user.username,
  }));

  if (!hasWallet) {
    alert("잘못된 접근입니다.");
    history.push("/");
  }

  return (
    <>
      <Header />
      <WalletViewerContainer username={username} />
    </>
  );
};

export default WalletPage;
