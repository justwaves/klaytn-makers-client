import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'redux/modules/write';
import TagBox from './TagBox';

export default () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.write.tags);

  const onChangeTags = nextTags => {
    dispatch(
      changeField({
        key: 'tags',
        value: nextTags,
      }),
    );
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};
