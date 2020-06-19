import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WalletCardFrame from './WalletCardFrame';
import { getAddress } from 'lib/crypto';
import AskModal from 'components/Common/AskModal';

const Wrapper = styled(WalletCardFrame)`
  height: 400px;
  position: relative;
`;

const Balance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Klay = styled.h1`
  color: ${props => props.theme.color.primary[3]};
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 1.5rem;
  }
`;

const Won = styled.div`
  color: ${props => props.theme.color.gray[4]};
  font-size: 1rem;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 22.5rem;
  height: 0.5rem;
  padding: 0;
  position: absolute;
  left: 0;
  top: 45%;
  background-color: ${props => props.theme.color.gray[1]};
`;

const AddressContainer = styled.div``;

const AddressTitle = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.color.gray[4]};
  font-weight: 500;
`;

const AddressBox = styled.div`
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid ${props => props.theme.color.gray[2]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Address = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.color.gray[4]};
  font-weight: 500;
`;

const Buttons = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

const AddressButton = styled.button`
  height: 2.5rem;
  width: 150px;
  border: 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.color.gray[4]};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const WalletAccount = ({ balance, logout }) => {
  const [modal, setModal] = useState(!balance);

  const openFaucet = () => {
    window.open(
      'https://baobab.wallet.klaytn.com/access?next=faucet',
      '_blank',
    );
  };

  const openKlayWallet = () => {
    window.open('https://baobab.wallet.klaytn.com/', '_blank');
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    openFaucet();
  };

  const address = getAddress();

  if (balance) {
    balance = balance.slice(0, 7);
  }

  const won = parseInt(balance) * 300;
  const parsedWon = (won - (won % 10)).toLocaleString();

  return (
    <Wrapper title="지갑 정보" more="Klaytn wallet" onClick={openKlayWallet}>
      <Balance>
        <Klay>
          {balance} <span>KLAY</span>
        </Klay>
        <Won>₩ {parsedWon}</Won>
      </Balance>
      <Divider />
      <AddressContainer>
        <AddressTitle onClick={openFaucet}>지갑 주소</AddressTitle>
        <AddressBox>
          <Address>{address}</Address>
        </AddressBox>
        <Buttons>
          <CopyToClipboard text={address}>
            <AddressButton onClick={() => alert('복사되었습니다')}>
              복사하기
            </AddressButton>
          </CopyToClipboard>
          <AddressButton onClick={logout}>로그아웃</AddressButton>
        </Buttons>
      </AddressContainer>
      {balance === '0' && (
        <AskModal
          visible={modal}
          title="KLAY가 부족합니다."
          description="테스트를 위한 KLAY를 받으시겠습니까?"
          confirmText="받기"
          cancelText="아니오"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(WalletAccount);
