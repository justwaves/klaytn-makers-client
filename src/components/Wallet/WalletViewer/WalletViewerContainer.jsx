import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { walletLogout } from "redux/modules/wallet";
import { setBuyerMakers } from "redux/modules/order";
import caver from "klaytn/caver";
import WalletViewer from "./WalletViewer";

const WalletViewerContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { address, feed } = useSelector(({ wallet }) => ({
    address: wallet.address,
    feed: wallet.feed,
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
    dispatch(setBuyerMakers());
  }, [address]);

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return <WalletViewer address={address} balance={balance} logout={logout} />;
};

export default WalletViewerContainer;
