import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4rem;
`;

const WhiteBox = styled.div`
  padding: 4rem 0;
  background: white;
  width: 552px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.color.gray[3]};
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

export default ({ children }) => (
  <Wrapper>
    <WhiteBox>
      <Logo>
        <Link to="/">klaytnMakers</Link>
      </Logo>
      {children}
    </WhiteBox>
  </Wrapper>
);
