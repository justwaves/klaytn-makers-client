import React from 'react';
import styled from 'styled-components';
import { RightArrow } from 'components/Common/Icons';

const Wrapper = styled.div`
  width: 22.5rem;
  padding: 1.5rem;
  overflow: hidden;
  background-color: ${props => props.theme.color.gray[1]};
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.color.primary[0]};
`;

const More = styled.span`
  height: 0.875rem;
  color: ${props => props.theme.color.gray[6]};
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.color.primary[4]};
  }

  svg {
    width: 0.5rem;
    margin-left: 0.375rem;
    margin-top: 0.125rem;
  }
`;

const Content = styled.div``;

const WalletCardFrame = ({ children, title, more, onClick, ...rest }) => (
  <Wrapper {...rest}>
    <Header>
      <Title>{title}</Title>
      <More onClick={onClick}>
        {more}
        <RightArrow />
      </More>
    </Header>
    <Content>{children}</Content>
  </Wrapper>
);

export default WalletCardFrame;
