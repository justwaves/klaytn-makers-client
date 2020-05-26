import React from 'react';
import styled from 'styled-components';
import Spinner from 'components/Common/Spinner';

const Wrapper = styled.button`
  background-color: ${props => props.theme.color.primary[1]};
  width: 100%;
  border: 0;
  border-radius: 4px;
  height: 3rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.primary[2]};
  }

  @media (max-width: 1200px) {
    max-width: 640px;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    border-radius: 0;
  }
`;

const LoadingButton = styled(Wrapper)`
  height: 3rem;
  background: ${props => props.theme.color.gray[0]};
  border: 1px solid ${props => props.theme.color.gray[2]};

  &:hover {
    cursor: auto;
    background: ${props => props.theme.color.gray[0]};
    border: 1px solid ${props => props.theme.color.gray[2]};
  }
`;

const OrderButton = ({ onOrder, loading }) => {
  if (loading) {
    return (
      <LoadingButton cyan>
        <Spinner />
      </LoadingButton>
    );
  }

  return <Wrapper onClick={onOrder}>주문하기</Wrapper>;
};

export default OrderButton;
