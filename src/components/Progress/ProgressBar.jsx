import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const Background = styled.div`
  background-color: ${props => props.theme.color.gray[3]};
  height: 0.5rem;
  border-radius: 2px;
  margin-bottom: 0.75rem;
`;

const ProgressStatus = styled.div`
  height: 100%;
  max-width: 100%;
  border-radius: 2px;
  background-color: ${props => props.theme.color.primary[0]};
  width: ${props => props.percentage}%;

  ${props =>
    props.percentage >= 100 &&
    css`
      background-color: ${props => props.theme.color.cyan};
    `}
`;

const OrderConut = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${props => props.theme.color.primary[0]};
  display: flex;
  justify-content: space-between;

  ${props =>
    props.percentage >= 100 &&
    css`
      color: ${props => props.theme.color.cyan};
    `}
`;

const ProgressBar = ({ targetCount, count = 5, cardView = true }) => {
  const percentage = Math.ceil((count / targetCount) * 100);
  return (
    <Wrapper>
      <Background>
        <ProgressStatus percentage={percentage} />
      </Background>
      {cardView && (
        <OrderConut percentage={percentage}>
          <span>{`${count}명이 주문중입니다.`}</span>
          <span>{percentage}%</span>
        </OrderConut>
      )}
    </Wrapper>
  );
};

export default ProgressBar;
