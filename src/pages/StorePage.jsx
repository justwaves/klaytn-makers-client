import React from "react";
import Header from "components/Header/Header";
import ProductListContainer from "components/ProductFeed/ProductList/ProductListContainer";
import NavigationContainer from "components/Header/Navigation/NavigationContainer";

const StorePage = () => (
  <>
    <Header />
    <NavigationContainer />
    <ProductListContainer />
  </>
);

export default StorePage;
