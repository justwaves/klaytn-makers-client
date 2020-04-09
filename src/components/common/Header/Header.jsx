import React from "react";
import styled from "styled-components";
import Responsive from "components/common/Responsive";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
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

const Header = ({ user, onLogout }) => (
  <>
    <Wrapper>
      <ResponsiveHeader>
        <Link to="/">
          <Logo>klaytnMakers</Logo>
        </Link>
        {user ? (
          <Right>
            <UserInfo>{user.username}</UserInfo>
            <Button onClick={onLogout}>로그아웃</Button>
          </Right>
        ) : (
          <Right>
            <Button to="/login">로그인</Button>
          </Right>
        )}
      </ResponsiveHeader>
    </Wrapper>
    <Spacer />
  </>
);

export default Header;
