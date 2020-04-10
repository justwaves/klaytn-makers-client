import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "redux/modules/write";
import Editor from "./Editor";

export default () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};
