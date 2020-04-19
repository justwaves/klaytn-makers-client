import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { writePost, updatePost } from "redux/modules/write";
import WriteActionButtons from "./WriteActionButtons";

const WriteActionButtonsContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    title,
    body,
    tags,
    post,
    postError,
    originalPostId,
    description,
    photo,
    price,
    targetCount,
    dDay,
  } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
    description: write.description,
    photo: write.photo,
    price: write.price,
    targetCount: write.targetCount,
    dDay: write.dDay,
  }));

  const onPublish = () => {
    if (originalPostId) {
      dispatch(
        updatePost({
          title,
          body,
          tags,
          id: originalPostId,
        }),
      );
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        tags,
        description,
        photo,
        price,
        targetCount,
        dDay,
      }),
    );
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
