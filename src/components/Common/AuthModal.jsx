import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from 'redux/modules/ui';
import { Close } from 'components/Common/Icons';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  min-width: 360px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: flex-end;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 0.5rem;
  background: white;
  color: ${props => props.theme.color.gray[4]};

  svg {
    fill: ${props => props.theme.color.gray[4]};
    width: 0.75rem;
    height: 0.75rem;
  }
`;

const AuthModal = () => {
  const { modal } = useSelector(({ ui }) => ({
    modal: ui.modal,
  }));

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideModal());
  };

  if (!modal) return null;

  return (
    <Fullscreen>
      <Wrapper>
        <Header>
          <div></div>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Header>
        {modal.content}
      </Wrapper>
    </Fullscreen>
  );
};

export default AuthModal;
