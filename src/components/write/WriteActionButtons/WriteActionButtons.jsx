import React from "react";
import styled from "styled-components";
import Button from "components/Common/Button";

const Wrapper = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  height: 3rem;
  width: 10.5rem;
  margin-right: 1.5rem;
`;

const CancelButton = styled(Button)`
  width: 4.5rem;
`;

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => (
  <Wrapper>
    <StyledButton cyan onClick={onPublish}>
      상품 {isEdit ? "수정" : "등록"}
    </StyledButton>
    <CancelButton onClick={onCancel}>취소</CancelButton>
  </Wrapper>
);

export default WriteActionButtons;
