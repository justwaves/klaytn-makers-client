import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/Common/ProgressBar';

const Wrapper = styled.div`
  min-height: 466px;
  min-width: 360px;
  max-width: 552px;
  border-radius: 4px;
  position: relative;

  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  cursor: pointer;
  overflow: hidden;

  ${props =>
    props.state !== '0' &&
    css`
      cursor: auto;
    `}

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

    ${props =>
      props.state !== '0' &&
      css`
        transform: none;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      `}
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

const Finished = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #b7a7a70e;
  z-index: 3;
  backdrop-filter: blur(3px);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 600;
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

const ProductCard = ({ post }) => {
  const { title, description, _id, photo, count, targetCount, state } = post;
  return (
    <Link to={`/product/${_id}`}>
      <Wrapper state={state}>
        {state && state !== '0' && (
          <Finished>
            <div>종료된 상품입니다</div>
          </Finished>
        )}
        <ImageContainer state={state}>
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
};

export default ProductCard;
