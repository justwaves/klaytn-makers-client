import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/Progress/ProgressBar';

const Wrapper = styled.div`
  min-height: 466px;
  min-width: 360px;
  max-width: 552px;
  border-radius: 4px;

  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 552px) {
    border-radius: 0;
    box-shadow: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50%;
  max-height: 15rem; /** 216px */
  overflow: hidden;

  @media (max-width: 816px) {
    border-radius: 0;
    max-height: 25rem;
  }

  img {
    width: 100%;
    border-radius: 8px 8px 0 0;
    cursor: pointer;

    @media (max-width: 552px) {
      border-radius: 0;
    }
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProductName = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ProductDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  text-align: justify;
  max-height: 100px;
  overflow: hidden;
`;

const ProductCard = ({
  title,
  description,
  photo = 'https://source.unsplash.com/random/720x500',
  count,
  targetCount,
  user,
  _id = '5e9c790b3d3ec23556c4ee84',
}) => (
  <Link to={`/@${user.username}/${_id}`}>
    <Wrapper>
      <ImageContainer>
        <img src={photo} alt="thumbnail" />
      </ImageContainer>
      <InfoContainer>
        <ProductName>{title}</ProductName>
        <ProductDesc>{description}</ProductDesc>
        <ProgressBar count={count} targetCount={targetCount} />
      </InfoContainer>
    </Wrapper>
  </Link>
);

export default ProductCard;
