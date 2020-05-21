import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './OrderDetail';
import { setBuyerMakers } from 'redux/modules/order';
import { combineOrderList } from 'redux/modules/filter';

const OrderDetailContainer = () => {
  const dispatch = useDispatch();
  const { buyerMakers, posts, loading, feed, combinedOrderList } = useSelector(
    ({ posts, loading, filter, order, makers }) => ({
      buyerMakers: order.buyerMakers,
      posts: posts.posts,
      combinedOrderList: filter.combinedOrderList,
      totalList: filter.totalList,
      loading: loading['posts/LIST_POSTS'],
      feed: makers.feed,
    }),
  );

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

  return (
    <OrderDetail
      combinedOrderList={combinedOrderList}
      loading={loading}
      feed={feed}
    />
  );
};

export default OrderDetailContainer;
