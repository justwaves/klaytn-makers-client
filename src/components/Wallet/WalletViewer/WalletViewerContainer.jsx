import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { walletLogout } from 'redux/modules/wallet';
import { setBuyerMakers } from 'redux/modules/order';
import { listPosts } from 'redux/modules/posts';
import caver from 'klaytn/caver';
import { combineList } from 'redux/modules/filter';
import WalletViewer from './WalletViewer';
import { setTxList } from 'redux/modules/tx';

const WalletViewerContainer = ({ username }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    address,
    buyerMakers,
    posts,
    combinedList,
    loading,
    txList,
    txListLoading,
  } = useSelector(({ posts, loading, filter, wallet, order, tx }) => ({
    address: wallet.address,
    buyerMakers: order.buyerMakers,
    posts: posts.posts,
    combinedList: filter.combinedList,
    loading: loading['posts/LIST_POSTS'],
    txList: tx.txList,
    txListLoading: loading['tx/SET_TX_LIST'],
  }));

  const logout = () => {
    dispatch(walletLogout());
    history.push('/');
  };

  const [balance, setBalance] = useState(0);

  const getBalance = async address => {
    if (!address) return;
    const result = await caver.klay.getBalance(address);
    setBalance(caver.utils.fromWei(result, 'ether'));
  };

  useEffect(() => {
    if (posts) return;
    if (username) {
      dispatch(listPosts({ username }));
    }
  }, [dispatch, location.search, username, posts]);

  useEffect(() => {
    if (txList) return;
    if (username) {
      dispatch(setTxList({ username }));
    }
  }, [dispatch, location.search, username, txList]);

  useEffect(() => {
    if (buyerMakers) return;
    dispatch(setBuyerMakers());
  }, [dispatch, buyerMakers]);

  useEffect(() => {
    if (balance) return;
    getBalance(address);
  }, [dispatch, address, balance]);

  useEffect(() => {
    if (posts && buyerMakers) {
      dispatch(combineList({ posts, feed: buyerMakers }));
    }
  }, [dispatch, buyerMakers, posts]);

  return (
    <WalletViewer
      address={address}
      balance={balance}
      logout={logout}
      buyerMakers={combinedList.reverse()}
      loading={loading}
      username={username}
      txList={txList}
      txListLoading={txListLoading}
    />
  );
};

export default React.memo(WalletViewerContainer);
