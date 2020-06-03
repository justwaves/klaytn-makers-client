import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WalletAccount from 'components/Wallet/WalletCard/WalletAccount';
import Profile from 'components/Wallet/WalletCard/Profile';
import TxList from 'components/Wallet/WalletCard/TxList';
import Orders from 'components/Wallet/WalletCard/Orders';
import { buyerMakerFilter } from 'lib/sort';

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
  combinedOrderList,
  loading,
  username,
  txList,
  txListLoading,
  feed,
  buyerMakersLoading,
  totalLoading,
  makersLoading,
}) => {
  const [inProgressList, setInProgressList] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);

  useEffect(() => {
    if (combinedOrderList && feed) {
      const arr = buyerMakerFilter(combinedOrderList, feed);
      setInProgressList(arr.filter(product => product.state === '0'));
      setTotalList(arr.filter(product => product.state !== '3'));
      setFinishedList(arr.filter(product => product.state !== '0'));
    }
  }, [combinedOrderList, feed]);

  return (
    <ResponsiveWrapper>
      <Grid>
        <Profile
          inProgressMakersCount={inProgressList.length}
          finisedMakersCount={finishedList.length}
          username={username}
        />
        <WalletAccount balance={balance} logout={logout} />
        <Orders
          buyerMakers={totalList}
          inProgressMakers={inProgressList}
          finisedMakers={finishedList}
          loading={loading}
          buyerMakersLoading={buyerMakersLoading}
          username={username}
          combinedOrderList={combinedOrderList}
          totalLoading={totalLoading}
          makersLoading={makersLoading}
        />
        <TxList txList={txList} txListLoading={txListLoading} />
      </Grid>
    </ResponsiveWrapper>
  );
};

export default React.memo(WalletViewer);
