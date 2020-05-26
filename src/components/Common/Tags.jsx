import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  margin-top: 0.5rem;

  .tag {
    display: inline-block;
    color: ${props => props.theme.color.secondary[2]};
    text-decoration: none;
    margin-right: 0.5rem;

    &:hover {
      color: ${props => props.theme.color.secondary[3]};
    }
  }
`;

const Tags = ({ tags }) => (
  <TagsBlock>
    {tags.map(tag => (
      <Link className="tag" to={`/tag=${tag}`} key={tag}>
        {`#${tag}`}
      </Link>
    ))}
  </TagsBlock>
);

export default Tags;
