import React, { useState, useEffect } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { walletLogout } from "redux/modules/wallet";
import { setBuyerMakers } from "redux/modules/order";
import { listPosts } from "redux/modules/posts";
import caver from "klaytn/caver";
import { combineList } from "redux/modules/filter";
import WalletViewer from "./WalletViewer";

const WalletViewerContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { address, buyerMakers, posts, combinedList, loading } = useSelector(
    ({ posts, loading, filter, wallet, order }) => ({
      address: wallet.address,
      buyerMakers: order.buyerMakers,
      posts: posts.posts,
      combinedList: filter.combinedList,
      loading: loading["posts/LIST_POSTS"],
    }),
  );

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
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  useEffect(() => {
    getBalance(address);
    dispatch(setBuyerMakers());
  }, [address, dispatch]);

  useEffect(() => {
    if (posts && buyerMakers) {
      console.log("===", buyerMakers);
      dispatch(combineList({ posts, feed: buyerMakers }));
    }
  }, [buyerMakers, posts, dispatch]);

  return (
    <WalletViewer
      address={address}
      balance={balance}
      logout={logout}
      buyerMakers={combinedList}
      loading={loading}
    />
  );
};

export default WalletViewerContainer;
