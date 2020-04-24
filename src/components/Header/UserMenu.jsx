import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/user";
import WalletLink from "components/Wallet/WalletLink";

const Wrapper = styled.div`
  min-width: 200px;
  position: absolute;
  top: 3.25rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -0.5rem;
  margin-right: 1rem;
  width: 0.875rem;
  height: 0.875rem;
  border-top: 1px solid ${props => props.theme.color.gray[4]};
  border-left: 1px solid ${props => props.theme.color.gray[4]};
  transform: rotate(45deg);
  background-color: ${props => props.theme.color.gray[1]};
  border-radius: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  background-color: ${props => props.theme.color.gray[0]};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.color.gray[4]};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid ${props => props.theme.color.gray[4]};
  background-color: ${props => props.theme.color.gray[1]};
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 400;

  &:hover {
    background-color: ${props => props.theme.color.primary[0]};
    color: white;
  }
`;

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const { hasWallet } = useSelector(({ wallet }) => ({
    hasWallet: wallet.hasWallet,
  }));

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Wrapper>
        <Arrow>
          <span></span>
        </Arrow>
        <Grid>
          <User>{user.username}</User>
          {hasWallet && (
            <Link to="/write">
              <Menu>상품 등록하기</Menu>
            </Link>
          )}
          <Link to="/test">
            <Menu>Test</Menu>
          </Link>
          <Menu onClick={onLogout}>로그아웃</Menu>
        </Grid>
      </Wrapper>
    </>
  );
};

export default UserMenu;
