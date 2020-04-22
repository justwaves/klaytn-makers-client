import React from "react";
import styled from "styled-components";
import WalletLoginForm from "./WalletLoginForm";
import Tabs from "components/Common/Tabs";
import CreateAccountForm from "./CreateAccountForm";
import { Klaytn } from "components/Common/Icons";

const Wrapper = styled.div`
  width: 34.5rem;
  padding-bottom: 2rem;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.color.primary[4]};
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  svg {
    margin-right: 0.75rem;
    fill: ${props => props.theme.color.primary[4]};
    margin-top: 0.125rem;
  }
`;

const KlaytnWalletLink = styled.div`
  color: ${props => props.theme.color.gray[7]};
  font-size: 0.75rem;
  cursor: pointer;
  margin-top: 2rem;
`;

const WalletAuth = () => {
  const openKlaytnWallet = () => {
    window.open("https://baobab.wallet.klaytn.com/", "_blank");
  };

  return (
    <Wrapper>
      <Header>
        <Klaytn /> Access Your Klaytn Wallet Account
      </Header>
      <Tabs
        leftTabTitle="Log In"
        rightTabTitle="Create Account"
        leftContent={<WalletLoginForm />}
        rightContent={<CreateAccountForm />}
      />
      <KlaytnWalletLink onClick={openKlaytnWallet}>
        Klaytn Wallet 바로가기
      </KlaytnWalletLink>
    </Wrapper>
  );
};

export default WalletAuth;
