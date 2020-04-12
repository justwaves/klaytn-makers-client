import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const ActionButton = styled.button``;

const PostActionButtons = () => (
  <Wrapper>
    <ActionButton>수정</ActionButton>
    <ActionButton>삭제</ActionButton>
  </Wrapper>
);

export default PostActionButtons;
