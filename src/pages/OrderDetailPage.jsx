import React from 'react';
import { useSelector } from 'react-redux';
import Header from 'components/Header/Header';
import Footer from 'components/Common/Footer';
import OrderDetailContainer from 'components/OrderDetail/OrderDetailContainer';

export default () => {
  const { username } = useSelector(({ user }) => ({
    username: user.user.username,
  }));
  return (
    <>
      <Header />
      <OrderDetailContainer username={username} />
      <Footer />
    </>
  );
};
