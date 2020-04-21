import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "redux/modules/user";
import WalletLink from "components/Wallet/WalletLink";

const Wrapper = styled.div`
  min-width: 120px;
  background-color: ${props => props.theme.color.gray[0]};
  border: 1px solid ${props => props.theme.color.gray[4]};
  position: absolute;
  top: 3rem;
  border-radius: 4px;
  z-index: 99;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.color.gray[4]};

  &:hover {
    background-color: ${props => props.theme.color.primary[0]};
    color: white;
  }
`;

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <Grid>
        <Menu>{user.username}</Menu>
        <Link to="/write">
          <Menu>상품 등록하기</Menu>
        </Link>
        <Menu>
          <WalletLink />
        </Menu>
        <Link to="/test">
          <Menu>Test</Menu>
        </Link>
        <Menu onClick={onLogout}>로그아웃</Menu>
      </Grid>
    </Wrapper>
  );
};

export default UserMenu;
