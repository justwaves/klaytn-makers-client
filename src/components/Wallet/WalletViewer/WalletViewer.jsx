import React from "react";
import styled from "styled-components";
import Responsive from "components/Common/Responsive";
import Button from "components/Common/Button";
import UserInfo from "../UserInfo";

const Wrapper = styled(Responsive)`
  padding: 3rem;
`;

const Div = styled.div`
  margin-top: 2rem;
`;

const WalletViewer = ({ address, balance, logout }) => {
  const openFaucet = () => {
    window.open(
      "https://baobab.wallet.klaytn.com/access?next=faucet",
      "_blank",
    );
  };

  return (
    <Wrapper>
      <Button onClick={logout}>logout</Button>
      <Button onClick={openFaucet}>openFaucet</Button>
      <Div>address: {address}</Div>
      <Div>balance: {balance}</Div>
      <UserInfo />
    </Wrapper>
  );
};

export default WalletViewer;
