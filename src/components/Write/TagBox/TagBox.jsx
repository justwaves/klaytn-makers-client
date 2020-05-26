import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  margin-top: 2rem;

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.color.primary[3]};
    font-weight: 500;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  display: flex;
  width: 22.5rem;
  border: 1px solid ${props => props.theme.color.gray[3]};
  overflow: hidden;

  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.75rem 1rem;
    flex: 1;
  }

  button {
    padding: 0rem 2rem;
    cursor: pointer;
    background-color: black;
    color: white;
    font-weight: 600;

    &:hover {
      background-color: ${props => props.theme.color.gray[4]};
    }
  }
`;

const TagListWrapper = styled.div`
  display: flex;
  margin: 0.75rem;
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${props => props.theme.color.primary[2]};
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListWrapper>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListWrapper>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return;
      if (localTags.includes(tag)) return;

      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <Wrapper>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </Wrapper>
  );
};

export default TagBox;
