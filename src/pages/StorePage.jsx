import React from "react";
import Header from "components/common/Header/Header";
import ProductListContainer from "components/ProductList/ProductListContainer";
import NavigationContainer from "components/common/Navigation/NavigationContainer";

const StorePage = () => (
  <>
    <Header />
    <NavigationContainer />
    <ProductListContainer />
  </>
);

export default StorePage;
