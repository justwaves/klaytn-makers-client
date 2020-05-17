import React, { useEffect, useCallback } from 'react';
import qs from 'qs';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from 'redux/modules/posts';
import { setFeed } from 'redux/modules/makers';
import { combineList } from 'redux/modules/filter';
import ProductList from './ProductList';

const ProductListContainer = () => {
  const { status } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    posts,
    error,
    loading,
    user,
    feed,
    combinedList,
    deadlineList,
    popularList,
    finishedList,
  } = useSelector(({ posts, loading, user, makers, filter }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    klaytnLoading: loading['makers/SET_FEED'],
    user: user.user,
    feed: makers.feed,
    combinedList: filter.combinedList,
    popularList: filter.popularList,
    deadlineList: filter.deadlineList,
    finishedList: filter.finishedList,
  }));

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
  }, [dispatch, onListPost, onSetFeed]);

  useEffect(() => {
    if (posts && feed) {
      dispatch(combineList({ feed, posts }));
    }
  }, [feed, posts, dispatch]);

  switch (status) {
    case 'home':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={combinedList}
          user={user}
        />
      );
    case 'popular':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={popularList}
          user={user}
        />
      );
    case 'deadline':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={deadlineList.slice(0, 10)}
          user={user}
        />
      );
    case 'finished':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={finishedList}
          user={user}
        />
      );
    default:
      break;
  }
};

export default React.memo(ProductListContainer);
