import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { walletLogout } from 'redux/modules/wallet';
import { setBuyerMakers } from 'redux/modules/order';
import { combineOrderList } from 'redux/modules/filter';
import WalletViewer from './WalletViewer';
import { setTxList } from 'redux/modules/tx';

const WalletViewerContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useParams();

  const {
    buyerMakers,
    posts,
    combinedOrderList,
    loading,
    txList,
    txListLoading,
    balance,
    feed,
    address,
    buyerMakersLoading,
    totalLoading,
    makersLoading,
  } = useSelector(({ posts, loading, filter, wallet, order, tx, makers }) => ({
    address: wallet.address,
    balance: wallet.balance,
    buyerMakers: order.buyerMakers,
    posts: posts.posts,
    combinedOrderList: filter.combinedOrderList,
    loading: loading['posts/LIST_POSTS'],
    txList: tx.txList,
    txListLoading: loading['tx/SET_TX_LIST'],
    buyerMakersLoading: loading['filter/COMBINE_ORDER_LIST'],
    totalLoading: loading['makers/SET_FEED'],
    feed: makers.feed,
    makersLoading: loading['order/SET_BUYER_MAKERS'],
  }));

  useEffect(() => {
    if (!combinedOrderList) {
      dispatch(setBuyerMakers());
    }
  }, [dispatch, combinedOrderList]);

  useEffect(() => {
    if (posts && buyerMakers) {
      dispatch(combineOrderList({ posts, feed: buyerMakers }));
    }
  }, [dispatch, buyerMakers, posts]);

  useEffect(() => {
    if (username) {
      dispatch(setTxList({ username }));
    }
  }, [dispatch, username]);

  const logout = useCallback(() => {
    dispatch(walletLogout());
    history.push('/');
  }, [dispatch, history]);

  return (
    <WalletViewer
      balance={balance}
      logout={logout}
      combinedOrderList={combinedOrderList}
      loading={loading}
      username={username}
      txList={txList}
      txListLoading={txListLoading}
      address={address}
      feed={feed}
      buyerMakersLoading={buyerMakersLoading}
      totalLoading={totalLoading}
      makersLoading={makersLoading}
    />
  );
};

export default WalletViewerContainer;
