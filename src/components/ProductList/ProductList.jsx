import React from 'react';
import styled from 'styled-components';
import Responsive from 'components/Common/Responsive';
import ProductCard from './ProductCard';
import Spinner from 'components/Common/Spinner';

const ResponsiveWrapper = styled(Responsive)`
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(460px, 1fr));
  gap: 1.5rem;
`;

const ProductList = ({ combinedList, loading, error, status }) => {
  console.log(`${status.toString()}: `, combinedList);
  if (error) {
    return <ResponsiveWrapper>에러가 발생했습니다.</ResponsiveWrapper>;
  }

  if (loading || !combinedList) {
    return (
      <ResponsiveWrapper>
        <Spinner wrapper />
      </ResponsiveWrapper>
    );
  }

  return (
    <ResponsiveWrapper>
      {!loading && combinedList && (
        <Grid>
          {combinedList.map(post => (
            <ProductCard post={post} key={post._id} />
          ))}
        </Grid>
      )}
    </ResponsiveWrapper>
  );
};

export default React.memo(ProductList);
