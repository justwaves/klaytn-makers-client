import React from "react";
import styled from "styled-components";
import WalletCardFrame from "./WalletCardFrame";

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
  color: ${props => props.theme.color.primary[4]};
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 1.5rem;
  }
`;

const Won = styled.div`
  color: ${props => props.theme.color.gray[6]};
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
  background-color: ${props => props.theme.color.gray[2]};
`;

const AddressContainer = styled.div``;

const AddressTitle = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.color.gray[7]};
  font-weight: 500;
`;

const AddressBox = styled.div`
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.gray[0]};
  border: 1px solid ${props => props.theme.color.gray[3]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Address = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.color.gray[7]};
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
  background-color: ${props => props.theme.color.gray[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.color.gray[7]};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.primary[1]};
    color: white;
  }
`;

const WalletAccount = ({ address, balance, logout }) => {
  const openFaucet = () => {
    window.open(
      "https://baobab.wallet.klaytn.com/access?next=faucet",
      "_blank",
    );
  };

  if (balance) {
    balance = balance.slice(0, 7);
  }

  return (
    <Wrapper title="지갑 정보" more="Klaytn wallet">
      <Balance>
        <Klay>
          {balance} <span>KLAY</span>
        </Klay>
        <Won>₩ 200,000</Won>
      </Balance>
      <Divider />
      <AddressContainer>
        <AddressTitle onClick={openFaucet}>지갑 주소</AddressTitle>
        <AddressBox>
          <Address>{address}</Address>
        </AddressBox>
        <Buttons>
          <AddressButton>복사하기</AddressButton>
          <AddressButton onClick={logout}>로그아웃</AddressButton>
        </Buttons>
      </AddressContainer>
    </Wrapper>
  );
};

export default WalletAccount;