import React, { useEffect, useCallback } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from 'redux/modules/posts';
import { setFeed } from 'redux/modules/makers';
import { combineList } from 'redux/modules/filter';
import ProductList from './ProductList';

const ProductListContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { posts, error, loading, user, feed, combinedList } = useSelector(
    ({ posts, loading, user, makers, filter }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      klaytnLoading: loading['makers/SET_FEED'],
      user: user.user,
      feed: makers.feed,
      combinedList: filter.combinedList,
    }),
  );

  const onListPost = useCallback(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location]);

  const onSetFeed = useCallback(() => {
    dispatch(setFeed());
  }, [dispatch]);

  useEffect(() => {
    onListPost();
    onSetFeed();
  }, [dispatch, location.search, onListPost, onSetFeed]);

  useEffect(() => {
    if (posts && feed) {
      dispatch(combineList({ feed, posts }));
    }
  }, [feed, posts, dispatch]);

  return (
    <ProductList
      loading={loading}
      error={error}
      combinedList={combinedList}
      user={user}
    />
  );
};

export default React.memo(ProductListContainer);
