import React from 'react';
import Header from 'components/Header/Header';
import ProductListContainer from 'components/ProductFeed/ProductList/ProductListContainer';
import NavigationContainer from 'components/Header/Navigation/NavigationContainer';
import Footer from 'components/Common/Footer';

const StorePage = () => (
  <>
    <Header />
    <NavigationContainer />
    <ProductListContainer />
    <Footer />
  </>
);

export default StorePage;
