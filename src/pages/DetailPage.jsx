import React from 'react';
import Header from 'components/Header/Header';
import ProductViewerContainer from 'components/ProductDetail/ProductViewer/ProductViewerContainer';
import Footer from 'components/Common/Footer';

export default () => {
  return (
    <>
      <Header />
      <ProductViewerContainer />
      <Footer />
    </>
  );
};
