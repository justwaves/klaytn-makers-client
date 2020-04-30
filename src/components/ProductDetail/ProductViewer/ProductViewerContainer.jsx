import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { readPost, unloadPost } from "redux/modules/post";
import PostActionButtons from "components/ProductDetail/PostActionButtons";
import { setOriginalPost } from "redux/modules/write";
import { setMakers } from "redux/modules/makers";
import { combineProduct } from "redux/modules/filter";
import { removePost } from "lib/api/posts";
import ProductViewer from "./ProductViewer";

const ProductViewerContainer = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { post, error, loading, user, makers, combinedProduct } = useSelector(
    ({ post, loading, user, makers, filter }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ_POST"],
      user: user.user,
      makers: makers.makers,
      combinedProduct: filter.combinedProduct,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    dispatch(setMakers(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  useEffect(() => {
    if (post && makers) {
      dispatch(combineProduct({ post, makers }));
    }
  }, [makers, post, dispatch]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push("/write");
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <ProductViewer
      combinedProduct={combinedProduct}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
      ownPost={user && user.id === post && post.id}
    />
  );
};

export default ProductViewerContainer;
