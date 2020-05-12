import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Responsive from 'components/Common/Responsive';

const Wrapper = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 9;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
`;

const ResponsiveNavigation = styled(Responsive)`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Spacer = styled.div`
  height: 3rem;
`;

const NavItem = styled.div`
  width: 10.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  height: 100%;
`;

const NavBoder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  color: ${props => props.theme.color.gray[6]};
  font-weight: 500;

  ${props =>
    props.border &&
    css`
      border-bottom: 4px solid black;
      color: ${props => props.theme.color.gray[9]};
    `}
`;

const Navigation = () => {
  const [navName, setNavName] = useState('home');
  const { status } = useParams();

  useEffect(() => {
    setNavName(status);
  }, [status]);

  return (
    <>
      <Wrapper>
        <ResponsiveNavigation>
          <NavItem>
            <Link to="/store/home">
              <NavBoder border={navName === 'home' ? 1 : 0}>홈</NavBoder>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/store/new">
              <NavBoder border={navName === 'new' ? 1 : 0}>신규</NavBoder>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/store/popular">
              <NavBoder border={navName === 'popular' ? 1 : 0}>인기</NavBoder>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/store/finished">
              <NavBoder border={navName === 'finished' ? 1 : 0}>마감</NavBoder>
            </Link>
          </NavItem>
        </ResponsiveNavigation>
      </Wrapper>
      <Spacer />
    </>
  );
};

export default Navigation;
