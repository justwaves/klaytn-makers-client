import React from "react";
import styled from "styled-components";
import Responsive from "components/Common/Responsive";
import ProductCardContainer from "components/ProductFeed/ProductCard/ProductCardContainer";

const ResponsiveWrapper = styled(Responsive)`
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(460px, 1fr));
  gap: 1.5rem;
`;

const ProductList = ({ posts, loading, error, user }) => {
  if (error) {
    return <ResponsiveWrapper>에러가 발생했습니다.</ResponsiveWrapper>;
  }

  return (
    <ResponsiveWrapper>
      {!loading && posts && (
        <Grid>
          {posts.map(post => (
            <ProductCardContainer post={post} key={post._id} user={user} />
          ))}
        </Grid>
      )}
    </ResponsiveWrapper>
  );
};

export default ProductList;
