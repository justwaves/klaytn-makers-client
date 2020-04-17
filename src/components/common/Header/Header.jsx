import React from "react";
import styled from "styled-components";
import Responsive from "components/common/Responsive";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import SearchBar from "components/common/Header/SearchBar";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  background-color: white;
  z-index: 99;
`;

const ResponsiveHeader = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Center = styled.div``;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const LoginButton = styled(Button)`
  width: 4.5rem;
  padding: 0.5rem 0;
  text-align: center;
  background-color: ${props => props.theme.color.primary[0]};
`;

const Header = ({ user, onLogout }) => (
  <>
    <Wrapper>
      <ResponsiveHeader>
        <Link to="/">
          <Logo>klaytnMakers</Logo>
        </Link>

        <Center>
          <SearchBar />
        </Center>

        {user ? (
          <Right>
            <UserInfo>
              <Link to="/test">test page</Link>
            </UserInfo>
            <UserInfo>{user.username}</UserInfo>
            <Button onClick={onLogout}>로그아웃</Button>
          </Right>
        ) : (
          <Right>
            <UserInfo>
              <Link to="/test">test page</Link>
            </UserInfo>
            <LoginButton to="/login">로그인</LoginButton>
          </Right>
        )}
      </ResponsiveHeader>
    </Wrapper>
    <Spacer />
  </>
);

export default Header;
