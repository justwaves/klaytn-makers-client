import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 0;
  outline: 0;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${props => props.theme.color.gray[6]};

  &:hover {
    background-color: ${props => props.theme.color.gray[1]};
    color: ${props => props.theme.color.cyan[7]};
  }

  & + & {
    margin-left: 0.25rem;
  }
`;

const PostActionButtons = ({ onEdit }) => (
  <Wrapper>
    <ActionButton onClick={onEdit}>수정</ActionButton>
    <ActionButton>삭제</ActionButton>
  </Wrapper>
);

export default PostActionButtons;
