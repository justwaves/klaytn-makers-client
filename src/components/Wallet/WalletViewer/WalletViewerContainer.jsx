import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { removeWallet } from "redux/modules/wallet";
import WalletViewer from "./WalletViewer";

const WalletViewerContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { address } = useSelector(({ wallet }) => ({
    address: wallet.address,
  }));

  const logout = () => {
    dispatch(removeWallet());
    history.push("/");
  };

  return <WalletViewer address={address} logout={logout} />;
};

export default WalletViewerContainer;
