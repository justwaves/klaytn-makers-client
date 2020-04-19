import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "components/common/Responsive";
import Button from "components/common/Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "components/common/Header/SearchBar";
import { Avatar, Cart, Notification } from "components/common/Icons";
import UserMenu from "./UserMenu";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  background-color: white;
  z-index: 99;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const UserInfo = styled.div`
  font-weight: 500;
  margin-left: 0.75rem;
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

const IconContainer = styled.span`
  margin-right: 1.5rem;
  cursor: pointer;
`;

const UsermenuContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Divider = styled.span`
  border: 1px solid ${props => props.theme.color.gray[3]};
  width: 1px;
  height: 80%;
  margin-right: 1.25rem;
`;

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Wrapper>
        <ResponsiveHeader>
          <Grid>
            <Left>
              <Link to="/store/home">
                <Logo>klaytnMakers</Logo>
              </Link>
            </Left>

            <Center>
              <SearchBar />
            </Center>

            {user ? (
              <Right>
                <IconContainer>
                  <Notification />
                </IconContainer>
                <IconContainer>
                  <Cart />
                </IconContainer>
                <Divider />
                <UsermenuContainer onClick={onClick}>
                  <Avatar />
                  <UserInfo>{user.username} ▾</UserInfo>
                </UsermenuContainer>
                {openMenu && <UserMenu user={user} />}
              </Right>
            ) : (
              <Right>
                <LoginButton to="/login">로그인</LoginButton>
              </Right>
            )}
          </Grid>
        </ResponsiveHeader>
      </Wrapper>
      <Spacer />
    </>
  );
};

export default Header;
