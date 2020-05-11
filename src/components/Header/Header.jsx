import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Responsive from "components/Common/Responsive";
import Button from "components/Common/Button";
import SearchBar from "components/Header/SearchBar";
import {
  Avatar,
  Klaytn,
  MenuDown,
  Notification,
  Cart,
} from "components/Common/Icons";
import UserMenu from "./UserMenu";
import WalletLink from "components/Wallet/WalletLink";
import { Bars } from "components/Common/Icons";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  background-color: white;
  z-index: 20;
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

  @media (max-width: 784px) {
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  letter-spacing: -1px;

  span {
    font-weight: 600;
  }
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

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Drawer = styled.div`
  display: none;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-left: 0.125rem;

  svg {
    margin-top: 0.25rem;
  }
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
  margin-right: 1rem;
  cursor: not-allowed;
`;

const KlaytnIconContainer = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 0.25rem;
  font-weight: 500;

  svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.color.primary[4]};
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${props => props.theme.color.primary[2]};
    svg {
      fill: ${props => props.theme.color.primary[3]};
    }
  }
`;

const UsermenuContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 0.125rem;
`;

const Divider = styled.span`
  border: 1px solid ${props => props.theme.color.gray[3]};
  width: 1px;
  height: 80%;
  margin-right: 1.25rem;
  margin-left: 1rem;
`;

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onMouseEnter = () => {
    setOpenMenu(true);
  };

  const onMouseLeave = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Wrapper>
        <ResponsiveHeader>
          <Grid>
            <Left>
              <Link to="/store/home">
                <Logo>
                  klaytn<span>Makers</span>
                </Logo>
              </Link>
            </Left>

            <Center>
              <SearchBar />
            </Center>

            {user ? (
              <Right>
                <KlaytnIconContainer>
                  <WalletLink username={user.username}>
                    <Klaytn /> Wallet
                  </WalletLink>
                </KlaytnIconContainer>
                <Divider />
                <IconContainer>
                  <Notification />
                </IconContainer>
                <IconContainer>
                  <Cart />
                </IconContainer>
                <UsermenuContainer onMouseEnter={onMouseEnter}>
                  <Avatar />
                  <UserInfo>
                    <MenuDown />
                  </UserInfo>
                </UsermenuContainer>
                {openMenu && (
                  <UserMenu
                    user={user}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                )}
              </Right>
            ) : (
              <Right>
                <LoginButton to="/login">로그인</LoginButton>
              </Right>
            )}
            <Drawer>
              <div>
                <Bars />
              </div>
            </Drawer>
          </Grid>
        </ResponsiveHeader>
      </Wrapper>
      <Spacer />
    </>
  );
};

export default Header;
