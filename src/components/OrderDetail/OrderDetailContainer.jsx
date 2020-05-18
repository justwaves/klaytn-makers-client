import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './OrderDetail';
import { setBuyerMakers } from 'redux/modules/order';
import { combineList } from 'redux/modules/filter';
import { listPosts } from 'redux/modules/posts';

const OrderDetailContainer = ({ username }) => {
  const dispatch = useDispatch();
  const { buyerMakers, posts, totalList, loading, feed } = useSelector(
    ({ posts, loading, filter, order, makers }) => ({
      buyerMakers: order.buyerMakers,
      posts: posts.posts,
      totalList: filter.totalList,
      loading: loading['posts/LIST_POSTS'],
      feed: makers.feed,
    }),
  );

  useEffect(() => {
    if (posts) return;
    if (username) {
      dispatch(listPosts({ username }));
    }
  }, [dispatch, username, posts]);

  useEffect(() => {
    if (buyerMakers) return;
    dispatch(setBuyerMakers());
  }, [dispatch, buyerMakers]);

  useEffect(() => {
    if (posts && buyerMakers) {
      dispatch(combineList({ posts, feed: buyerMakers }));
    }
  }, [buyerMakers, posts, dispatch]);

  return (
    <OrderDetail
      buyerMakers={totalList.reverse()}
      loading={loading}
      feed={feed}
    />
  );
};

export default React.memo(OrderDetailContainer);
