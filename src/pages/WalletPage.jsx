import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Header from 'components/Header/Header';
import WalletViewerContainer from 'components/Wallet/WalletViewer/WalletViewerContainer';
import Footer from 'components/Common/Footer';

const WalletPage = () => {
  const history = useHistory();
  const { hasWallet } = useSelector(({ wallet }) => ({
    hasWallet: wallet.hasWallet,
  }));

  if (!hasWallet) {
    alert('잘못된 접근입니다.');
    history.push('/');
  }

  return (
    <>
      <Header />
      <WalletViewerContainer />
      <Footer />
    </>
  );
};

export default WalletPage;
