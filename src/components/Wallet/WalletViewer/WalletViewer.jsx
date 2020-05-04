import React from "react";
import styled from "styled-components";
import WalletAccount from "components/Wallet/WalletCard/WalletAccount";
import Profile from "components/Wallet/WalletCard/Profile";
import TxList from "components/Wallet/WalletCard/TxList";
import Orders from "components/Wallet/WalletCard/Orders";

const ResponsiveWrapper = styled.div`
  width: 744px;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const WalletViewer = ({ address, balance, logout, buyerMakers }) => {
  return (
    <ResponsiveWrapper>
      <Grid>
        <Profile />
        <WalletAccount address={address} balance={balance} logout={logout} />
        <Orders buyerMakers={buyerMakers} />
        <TxList />
      </Grid>
    </ResponsiveWrapper>
  );
};

export default WalletViewer;
