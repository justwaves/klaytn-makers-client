import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { readPost, unloadPost } from "redux/modules/post";
import PostActionButtons from "components/post/PostActionButtons";
import { setOriginalPost } from "redux/modules/write";
import { removePost } from "lib/api/posts";
import PostViewer from "./PostViewer";

const PostViewerContainer = () => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ_POST"],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

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

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user && user.id === post && post.id}
    />
  );
};

export default PostViewerContainer;
