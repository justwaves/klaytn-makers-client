import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from "redux/modules/write";
import Editor from "./Editor";

export default () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
  }));

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = date => {
    const yearValue = date.getYear() + 1900;
    const monthValue = date.getMonth() + 1;
    const dateValue = date.getDate();

    if (monthValue >= 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue >= 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue < 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-0${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
    } else if (monthValue < 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-0${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
    }
  };

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor
      onChangeField={onChangeField}
      title={title}
      body={body}
      handleDateChange={handleDateChange}
      selectedDate={selectedDate}
    />
  );
};
