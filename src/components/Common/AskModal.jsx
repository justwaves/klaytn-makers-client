import React from 'react';
import styled from 'styled-components';
import Button from 'components/Common/Button';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  font-weight: 500;

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.gray[5]};
  }

  p {
    margin-bottom: 3rem;
    color: ${props => props.theme.color.primary[3]};
    font-size: 0.875rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const CancelButton = styled(Button)`
  height: 2rem;
  background-color: ${props => props.theme.color.gray[1]};
  border: 1px solid ${props => props.theme.color.gray[2]};
  color: black;
  font-weight: 400;

  &:hover {
    background-color: ${props => props.theme.color.gray[0]};
  }

  & + & {
    margin-left: 0.75rem;
  }
`;

const ConfirmButton = styled(Button)`
  height: 2rem;
  font-weight: 500;
  margin-left: 0.75rem;
`;

const AskModal = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <Wrapper>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <ConfirmButton cyan onClick={onConfirm}>
            {confirmText}
          </ConfirmButton>
        </div>
      </Wrapper>
    </Fullscreen>
  );
};

export default React.memo(AskModal);
