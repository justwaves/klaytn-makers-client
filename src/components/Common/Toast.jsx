import React from "react";
import styled, { css } from "styled-components";
import { KLAYTN_SCOPE } from "constants/url";
import ui from "utils/ui";
import { Close } from "components/Common/Icons";

const Wrapper = styled.div`
  width: 460px;
  height: 160px;
  padding: 1.5rem;
  z-index: 100;
  background-color: ${props => props.theme.color.gray[0]};
  border: 1px solid ${props => props.theme.color.gray[7]};
  opacity: 0;
  animation: showToast 10s;

  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  /* top: 120px; */
  top: -200px;

  @keyframes showToast {
    0% {
      opacity: 0;
      visibility: visible;
      top: -200px;
    }

    2% {
      top: 120px;
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    98% {
      opacity: 0;
      visibility: hidden;
      opacity: 1;
      top: 120px;
    }

    100% {
      top: -200px;
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.theme.color.primary[0]};
  animation: progress 10s linear;

  ${props =>
    props.status === "fail" &&
    css`
      background-color: ${props => props.theme.color.red};
    `}

  @keyframes progress {
    0% {
      width: 100%;
    }

    100% {
      width: 0;
    }
  }
`;

const Status = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.theme.color.primary[0]};

  ${props =>
    props.status === "pending" &&
    css`
      color: ${props => props.theme.color.gray[2]};
    `}

  ${props =>
    props.status === "fail" &&
    css`
      color: ${props => props.theme.color.red};
    `}
`;

const Message = styled.p`
  font-size: 1rem;
  color: black;
  padding-bottom: 1rem;
`;

const TxHash = styled.div`
  display: block;
  position: relative;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 500;
  color: ${props => props.theme.color.primary[4]};
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.875rem;
  cursor: pointer;
  border-top: 1px solid ${props => props.theme.color.gray[4]};

  &:hover {
    color: ${props => props.theme.color.primary[3]};
  }

  ${props =>
    props.link &&
    css`
      text-decoration: underline;
      &:hover {
        opacity: 1;
      }
    `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background-color: white;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const TxHashContainer = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const Scope = styled.div`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const Error = styled.div``;

const Toast = ({ toast }) => {
  return (
    toast && (
      <Wrapper key={new Date().getTime()}>
        <ProgressBar status={toast.status} />
        <Status status={toast.status}>{toast.status}</Status>
        <Message>{toast.message}</Message>

        {toast.link && (
          <TxHashContainer
            href={`${KLAYTN_SCOPE}tx/${toast.link}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {toast.txHash && <TxHash>{toast.txHash}</TxHash>}
            <Scope>트랜잭션 정보 상세보기 &gt;</Scope>
          </TxHashContainer>
        )}
        {toast.error && <Error>{toast.error.slice(0, 18)}</Error>}
        <CloseButton onClick={ui.hideToast}>
          <Close />
        </CloseButton>
      </Wrapper>
    )
  );
};

export default React.memo(Toast);
