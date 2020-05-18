import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import { writePost, updatePost } from 'redux/modules/write';
import WriteActionButtons from './WriteActionButtons';
import { uploadMakers, unloadMakers } from 'redux/modules/makers';
import { removePost } from 'lib/api/posts';

const WriteActionButtonsContainer = () => {
  const [klaytnLoading, setKlaytnLoading] = useState(false);

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
    loading,
  } = useSelector(({ write, makers, loading }) => ({
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
    loading: loading['write/WRITE_POST'],
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
      console.log(e.toString());
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
        const newdate = moment(dDay).unix();
        console.log(newdate);
        dispatch(
          uploadMakers({
            postId: _id,
            title,
            price,
            targetCount,
            dDay: newdate,
          }),
        );
      } catch (e) {
        console.log(e);
      }
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError, dispatch]); // eslint-disable-line

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      if (!receipt) {
        setKlaytnLoading(true);
        console.log('Klaytn contract API loading...');
      }

      if (receipt) {
        setKlaytnLoading(false);
        history.push(`/@${user.username}/${_id}`);
      }
    }
  }, [history, receipt, post]);

  useEffect(() => {
    if (makersError) {
      const { _id } = post;

      try {
        removePost(_id);
      } catch (e) {
        console.log(e);
      }

      dispatch(unloadMakers());
      setKlaytnLoading(false);
    }
  }, [makersError, dispatch]); // eslint-disable-line

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
      klaytnLoading={klaytnLoading}
      loading={loading}
    />
  );
};

export default WriteActionButtonsContainer;
