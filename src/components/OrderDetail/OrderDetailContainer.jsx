import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './OrderDetail';
import { setBuyerMakers } from 'redux/modules/order';
import { combineList } from 'redux/modules/filter';
import { listPosts } from 'redux/modules/posts';

const OrderDetailContainer = ({ username }) => {
  const dispatch = useDispatch();
  const { buyerMakers, posts, combinedList, loading } = useSelector(
    ({ posts, loading, filter, order }) => ({
      buyerMakers: order.buyerMakers,
      posts: posts.posts,
      combinedList: filter.combinedList,
      loading: loading['posts/LIST_POSTS'],
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

  return <OrderDetail buyerMakers={combinedList.reverse()} loading={loading} />;
};

export default React.memo(OrderDetailContainer);
