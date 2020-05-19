import React from 'react';
import Header from 'components/Header/Header';
import ProductListContainer from 'components/ProductList/ProductListContainer';
import Navigation from 'components/Header/Navigation';
import Footer from 'components/Common/Footer';

const StorePage = () => (
  <>
    <Header />
    <Navigation />
    <ProductListContainer />
    <Footer />
  </>
);

export default StorePage;
