import React from 'react';
import ProductCard from './ProductCard';

const ProductCardContainer = ({ post }) => {
  const {
    tags,
    title,
    description,
    _id,
    photo,
    user,
    count,
    targetCount,
    state,
  } = post;

  return (
    <ProductCard
      title={title}
      description={description}
      photo={photo}
      tags={tags}
      count={count}
      targetCount={targetCount}
      user={user}
      _id={_id}
      state={state}
    />
  );
};

export default ProductCardContainer;
