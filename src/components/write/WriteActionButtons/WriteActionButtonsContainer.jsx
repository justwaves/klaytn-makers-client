import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { writePost, updatePost } from "redux/modules/write";
import WriteActionButtons from "./WriteActionButtons";
import { uploadMakers } from "redux/modules/makers";

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

  const onPublish = async () => {
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

    try {
      await dispatch(
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
    } catch (e) {
      alert(`상품 등록에 실패하였습니다. error: ${e}`);
      history.goBack();
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      try {
        const { _id, user } = post;
        dispatch(
          uploadMakers({
            postId: _id,
            title,
            description,
            price,
            targetCount,
            dDay,
          }),
        );
        history.push(`/@${user.username}/${_id}`);
      } catch (e) {
        console.log(e);
        alert("상품등록 실패");
        history.push(`/write`);
      }
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
