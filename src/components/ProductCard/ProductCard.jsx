import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 460px;
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
  height: 50%; /* 216px */
  overflow: hidden;

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

const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ProgressBar = styled.div`
  border: 1px solid grey;
  height: 0.5rem;
  background-color: ${props => props.theme.color.primary[0]};
  margin-bottom: 0.75rem;
  border-radius: 2px;
`;

const OrderConut = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${props => props.theme.color.primary[0]};
  display: flex;
  justify-content: space-between;
`;

const ProductCard = () => (
  <Wrapper>
    <ImageContainer>
      <img
        src="https://t1.daumcdn.net/makers_smith/file/items/100000577/masters/07c6d7d5b0c14c91bd41082d49f08078.jpg?type=thumb&opt=C640x448.i"
        alt=""
      />
    </ImageContainer>
    <InfoContainer>
      <ProductName>장 건강을 위한 복합 포뮬러</ProductName>
      <ProductDesc>
        유산균과 유산균의 먹이가 되는 프리바이오틱스를 함께 배합한
        건강기능식품입니다. 한 포에 19종 유산균 1억마리와 프리바이오틱스
        4000mg을 넣었습니다. 면역 기능에 도움을 주는 아연도 함께 담았습니다.면역
        기능에 도움을 주는 아연도 함께 담았습니다.
      </ProductDesc>
      <ProgressBarContainer>
        <ProgressBar />
        <OrderConut>
          <span>1022명이 주문중입니다.</span>
          <span>88%</span>
        </OrderConut>
      </ProgressBarContainer>
    </InfoContainer>
  </Wrapper>
);

export default ProductCard;
