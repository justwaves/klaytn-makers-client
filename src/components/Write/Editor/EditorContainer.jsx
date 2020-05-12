import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from 'redux/modules/write';
import Editor from './Editor';
import moment from 'moment';

export default () => {
  const dispatch = useDispatch();
  const {
    title,
    body,
    description,
    photo,
    price,
    targetCount,
    dDay,
  } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    description: write.description,
    photo: write.photo,
    price: write.price,
    targetCount: write.targetCount,
    dDay: write.dDay,
  }));

  const today = moment().format();

  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = date => {
    const formattedDate = moment(date).format();
    setSelectedDate(formattedDate);

    onChangeField({ key: 'dDay', value: formattedDate });
  };

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  const onChange = e => {
    const key = e.target.name;
    if (key === 'targetCount' || key === 'price') {
      const value = parseInt(e.target.value);
      onChangeField({ key, value });
      return;
    }
    onChangeField({ key, value: e.target.value });
  };

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
      description={description}
      photo={photo}
      price={price}
      targetCount={targetCount}
      dDay={dDay}
      handleDateChange={handleDateChange}
      selectedDate={selectedDate}
      onChange={onChange}
    />
  );
};
