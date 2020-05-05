import React from "react";
import styled from "styled-components";
import WalletCardFrame from "./WalletCardFrame";
import { Avatar } from "components/Common/Icons";
import {
  RightArrow,
  Truck,
  HeartEmpty,
  Cupon,
  Question,
} from "components/Common/Icons";

const Wrapper = styled(WalletCardFrame)`
  height: 400px;
  position: relative;
  z-index: 3;
`;

const Layer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 45%;
  left: 0;
  background-color: ${props => props.theme.color.gray[2]};
  z-index: -1;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid grey;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 4rem;
    height: 4rem;
    fill: ${props => props.theme.color.gray[7]};
  }
`;

const Username = styled.div`
  margin-bottom: 3.5rem;
`;

const DownContent = styled.div``;

const OrderProgress = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0.5rem;
`;

const RightArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;
  padding: 0 0.5rem;

  svg {
    width: 8px;
    height: 8px;
    fill: ${props => props.theme.color.gray[7]};
  }
`;

const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  width: 25%;
`;

const OrderCount = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.color.gray[7]};
  margin-bottom: 0.75rem;
`;

const OrderText = styled.p`
  font-size: 0.625rem;
  color: ${props => props.theme.color.gray[7]};
  font-weight: 500;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.button`
  height: 4.5rem;
  width: 4.5rem;
  background-color: white;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.color.gray[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.color.gray[7]};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.color.primary[1]};
    color: white;
  }
`;

const ButtonIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-bottom: 0.5rem;
  /* border: 1px solid ${props => props.theme.color.gray[4]}; */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg { 
  }
`;

const ButtonText = styled.p`
  font-size: 0.625rem;
  color: ${props => props.theme.color.gray[7]};
  font-weight: 500;
`;

const Profile = ({ inProgressMakersCount, finisedMakersCount }) => {
  return (
    <Wrapper title="내 정보" more="내 정보 관리">
      <TopContent>
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
        <Username>username</Username>
      </TopContent>
      <Layer />
      <DownContent>
        <OrderProgress>
          <OrderBox>
            <OrderCount>{inProgressMakersCount}</OrderCount>
            <OrderText>펀딩진행중</OrderText>
          </OrderBox>
          <RightArrowWrapper>
            <RightArrow />
          </RightArrowWrapper>
          <OrderBox>
            <OrderCount>{finisedMakersCount}</OrderCount>
            <OrderText>펀딩완료</OrderText>
          </OrderBox>
          <RightArrowWrapper>
            <RightArrow />
          </RightArrowWrapper>
          <OrderBox>
            <OrderCount>0</OrderCount>
            <OrderText>배송중</OrderText>
          </OrderBox>
          <RightArrowWrapper>
            <RightArrow />
          </RightArrowWrapper>
          <OrderBox>
            <OrderCount>0</OrderCount>
            <OrderText>배송완료</OrderText>
          </OrderBox>
        </OrderProgress>
        <Buttons>
          <ButtonBox>
            <ButtonIcon>
              <Truck />
            </ButtonIcon>
            <ButtonText>배송조회</ButtonText>
          </ButtonBox>
          <ButtonBox>
            <ButtonIcon>
              <HeartEmpty />
            </ButtonIcon>
            <ButtonText>좋아요</ButtonText>
          </ButtonBox>
          <ButtonBox>
            <ButtonIcon>
              <Cupon />
            </ButtonIcon>
            <ButtonText>쿠폰</ButtonText>
          </ButtonBox>
          <ButtonBox>
            <ButtonIcon>
              <Question />
            </ButtonIcon>
            <ButtonText>문의하기</ButtonText>
          </ButtonBox>
        </Buttons>
      </DownContent>
    </Wrapper>
  );
};

export default Profile;
