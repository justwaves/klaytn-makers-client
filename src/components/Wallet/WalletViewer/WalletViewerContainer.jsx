import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { walletLogout } from "redux/modules/wallet";
import caver from "klaytn/caver";
import WalletViewer from "./WalletViewer";

const WalletViewerContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { address } = useSelector(({ wallet }) => ({
    address: wallet.address,
  }));

  const logout = () => {
    dispatch(walletLogout());
    history.push("/");
  };

  const [balance, setBalance] = useState(0);

  const getBalance = async address => {
    if (!address) return;
    const result = await caver.klay.getBalance(address);
    setBalance(caver.utils.fromWei(result, "ether"));
  };

  useEffect(() => {
    getBalance(address);
  }, [address]);

  return <WalletViewer address={address} balance={balance} logout={logout} />;
};

export default WalletViewerContainer;
