import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { writePost, updatePost } from "redux/modules/write";
import WriteActionButtons from "./WriteActionButtons";
import { uploadMakers, unloadMakers } from "redux/modules/makers";
import { removePost } from "lib/api/posts";

const WriteActionButtonsContainer = () => {
  const [loading, setLoading] = useState(false);

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
    receipt,
    makersError,
  } = useSelector(({ write, makers }) => ({
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
    receipt: makers.receipt,
    makersError: makers.error,
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
      const { _id } = post;
      try {
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
      } catch (e) {
        console.log(e);
      }
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      if (!receipt) {
        setLoading(true);
        console.log("Klaytn contract API loading...");
      }

      if (receipt) {
        setLoading(false);
        history.push(`/@${user.username}/${_id}`);
      }
    }
  }, [history, receipt, post]);

  useEffect(() => {
    if (makersError) {
      const { _id } = post;
      alert(`Klaytn Error: ${makersError.reason}`);

      try {
        removePost(_id);
      } catch (e) {
        console.log(e);
      }

      dispatch(unloadMakers());
      setLoading(false);
    }
  }, [makersError, dispatch]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
      loading={loading}
    />
  );
};

export default WriteActionButtonsContainer;
