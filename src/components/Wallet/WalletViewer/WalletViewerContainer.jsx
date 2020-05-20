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
    address,
  } = useSelector(({ posts, loading, filter, wallet, order, tx }) => ({
    address: wallet.address,
    balance: wallet.balance,
    buyerMakers: order.buyerMakers,
    posts: posts.posts,
    combinedOrderList: filter.combinedOrderList,
    loading: loading['posts/LIST_POSTS'],
    txList: tx.txList,
    txListLoading: loading['tx/SET_TX_LIST'],
  }));

  useEffect(() => {
    if (!buyerMakers) {
      dispatch(setBuyerMakers());
    }
  }, [dispatch, buyerMakers]);

  useEffect(() => {
    if (posts && buyerMakers) {
      dispatch(combineOrderList({ posts, feed: buyerMakers }));
    }
  }, [dispatch, buyerMakers, posts]);

  useEffect(() => {
    if (!txList && username) {
      dispatch(setTxList({ username }));
    }
  }, [dispatch, username, txList]);

  const logout = useCallback(() => {
    dispatch(walletLogout());
    history.push('/');
  }, [dispatch, history]);

  return (
    <WalletViewer
      balance={balance}
      logout={logout}
      buyerMakers={combinedOrderList.reverse()}
      loading={loading}
      username={username}
      txList={txList}
      txListLoading={txListLoading}
      address={address}
    />
  );
};

export default React.memo(WalletViewerContainer);
