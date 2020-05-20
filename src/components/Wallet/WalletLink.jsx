import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import WalletAuthModal from './WalletAuth/WalletAuthModal';
import { showModal } from 'redux/modules/ui';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const WalletLink = ({ children, username }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { hasWallet } = useSelector(({ wallet }) => ({
    hasWallet: wallet.hasWallet,
  }));

  // 로그인됨 -> wallet page로 이동
  const openWallet = () => {
    history.push(`/wallet/${username}`);
  };

  // 로그인 안됨 -> 모달 띄우기
  const showAuthModal = () => {
    dispatch(
      showModal({
        content: <WalletAuthModal />,
      }),
    );
  };

  return (
    <Wrapper onClick={hasWallet ? openWallet : showAuthModal}>
      {children}
    </Wrapper>
  );
};

export default WalletLink;
