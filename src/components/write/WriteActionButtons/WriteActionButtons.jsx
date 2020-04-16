import React from "react";
import styled from "styled-components";
import Button from "components/common/Button";

const Wrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => (
  <Wrapper>
    <StyledButton cyan onClick={onPublish}>
      포스트 {isEdit ? "수정" : "등록"}
    </StyledButton>
    <StyledButton onClick={onCancel}>취소</StyledButton>
  </Wrapper>
);

export default WriteActionButtons;