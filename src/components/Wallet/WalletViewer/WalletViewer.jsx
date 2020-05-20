import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WalletAccount from 'components/Wallet/WalletCard/WalletAccount';
import Profile from 'components/Wallet/WalletCard/Profile';
import TxList from 'components/Wallet/WalletCard/TxList';
import Orders from 'components/Wallet/WalletCard/Orders';

const ResponsiveWrapper = styled.div`
  width: 744px;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  min-height: 100vh;

  @media (max-width: 816px) {
    width: 380px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 816px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 380px;
    margin: 0 auto;

    > div {
      margin-bottom: 1.5rem;
    }
  }
`;

const WalletViewer = ({
  balance,
  logout,
  buyerMakers,
  loading,
  username,
  txList,
  txListLoading,
}) => {
  const [inProgressMakers, setInProgressMakers] = useState(buyerMakers);
  const [finisedMakers, setFinisedMakers] = useState(buyerMakers);

  useEffect(() => {
    const list = buyerMakers.filter(makers => makers.state !== '0');
    setFinisedMakers(list);
    const progressList = buyerMakers.filter(makers => makers.state === '0');
    setInProgressMakers(progressList);
  }, [buyerMakers]);

  return (
    <ResponsiveWrapper>
      <Grid>
        <Profile
          inProgressMakersCount={inProgressMakers.length}
          finisedMakersCount={finisedMakers.length}
          username={username}
        />
        <WalletAccount balance={balance} logout={logout} />
        <Orders
          buyerMakers={inProgressMakers}
          inProgressMakers={inProgressMakers}
          finisedMakers={finisedMakers}
          loading={loading}
        />
        <TxList txList={txList} txListLoading={txListLoading} />
      </Grid>
    </ResponsiveWrapper>
  );
};

export default React.memo(WalletViewer);
