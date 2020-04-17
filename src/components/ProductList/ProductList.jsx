import React from "react";
import styled from "styled-components";
import Responsive from "components/common/Responsive";
import ProductCardContainer from "components/ProductCard/ProductCardContainer";

const ResponsiveWrapper = styled(Responsive)`
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(460px, 1fr));
  gap: 1.5rem;
  /* justify-content: center; */
`;

const ProductList = () => (
  <ResponsiveWrapper>
    <Grid>
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
      <ProductCardContainer />
    </Grid>
  </ResponsiveWrapper>
);

export default ProductList;
