import React from "react";
import styled from "styled-components";
import Button from "components/Common/Button";
import Spinner from "components/Common/Spinner";

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

const LoadingButton = styled(Button)`
  height: 3rem;
  width: 10.5rem;
  margin-right: 1.5rem;
  background: ${props => props.theme.color.gray[2]};
  border: 1px solid ${props => props.theme.color.gray[3]};

  &:hover {
    cursor: auto;
    background: ${props => props.theme.color.gray[2]};
    border: 1px solid ${props => props.theme.color.gray[3]};
  }
`;

const CancelButton = styled(Button)`
  width: 4.5rem;
`;

const WriteActionButtons = ({
  onCancel,
  onPublish,
  isEdit,
  klaytnLoading,
  loading,
}) => {
  if (loading || klaytnLoading) {
    return (
      <Wrapper>
        <LoadingButton cyan>
          <Spinner />
        </LoadingButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <StyledButton cyan onClick={onPublish}>
        상품 {isEdit ? "수정" : "등록"}
      </StyledButton>
      <CancelButton onClick={onCancel}>취소</CancelButton>
    </Wrapper>
  );
};

export default WriteActionButtons;
