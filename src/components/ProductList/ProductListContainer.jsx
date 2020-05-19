import React, { useEffect } from 'react';
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
    feed,
    combinedList,
    deadlineList,
    popularList,
    finishedList,
  } = useSelector(({ posts, loading, makers, filter }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    klaytnLoading: loading['makers/SET_FEED'],
    feed: makers.feed,
    combinedList: filter.combinedList,
    popularList: filter.popularList,
    deadlineList: filter.deadlineList,
    finishedList: filter.finishedList,
  }));

  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
    dispatch(setFeed());
  }, [dispatch, location.search]);

  useEffect(() => {
    if (posts && feed) {
      dispatch(combineList({ feed, posts }));
    }
  }, [dispatch, feed, posts]);

  switch (status) {
    case 'home':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={combinedList}
          status={status}
        />
      );
    case 'popular':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={popularList}
          status={status}
        />
      );
    case 'deadline':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={deadlineList.slice(0, 10)}
          status={status}
        />
      );
    case 'finished':
      return (
        <ProductList
          loading={loading}
          error={error}
          combinedList={finishedList}
          status={status}
        />
      );
    default:
      break;
  }
};

export default ProductListContainer;
