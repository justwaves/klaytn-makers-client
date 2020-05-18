import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/modules/user';
import { Avatar } from 'components/Common/Icons';

const Wrapper = styled.div`
  position: absolute;
  top: 3.25rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  user-select: none;
  margin-top: 4px;
  margin-left: 11px;
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
  user-select: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  background-color: ${props => props.theme.color.gray[0]};
  border-radius: 2px;
  border: 1px solid ${props => props.theme.color.gray[4]};
  width: 15rem;
`;

const User = styled.div`
  height: 5.5rem;
  display: flex;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.color.gray[4]};
`;

const AvatarUsername = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1.5rem;
`;

const AvatarContainer = styled.div`
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-top: -0.25rem;
`;

const Balance = styled.div`
  margin-top: 0.5rem;
  font-weight: 700;
  color: ${props => props.theme.color.primary[4]};

  span {
    font-weight: 500;
    font-size: 0.875rem;
  }
`;

const Menu = styled.div`
  background-color: ${props => props.theme.color.gray[1]};
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 400;

  &:hover {
    background-color: ${props => props.theme.color.primary[4]};
    color: white;
  }
`;

const Logout = styled.div`
  background-color: white;
  padding: 0.5rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid ${props => props.theme.color.gray[4]};

  span {
    cursor: pointer;
    padding: 0.5rem 0.5rem;

    &:hover {
      color: ${props => props.theme.color.primary[4]};
    }
  }
`;

const UserMenu = ({ user, onMouseEnter, onMouseLeave, balance }) => {
  const dispatch = useDispatch();
  const { hasWallet } = useSelector(({ wallet }) => ({
    hasWallet: wallet.hasWallet,
  }));

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Arrow>
          <span></span>
        </Arrow>
        <Grid>
          <User>
            <AvatarUsername>
              <AvatarContainer>
                <Avatar />
              </AvatarContainer>
            </AvatarUsername>

            <UserInfo>
              <Username>{user.username}</Username>
              <Balance>
                {balance && balance.slice(0, 7)} <span>KLAY</span>
              </Balance>
            </UserInfo>
          </User>

          {hasWallet && (
            <Link to="/write">
              <Menu>상품 등록하기</Menu>
            </Link>
          )}
          <Link to="/wallet">
            <Menu>클레이튼 지갑</Menu>
          </Link>
          <Link to="/orders">
            <Menu>주문내역</Menu>
          </Link>
          <Link to="/test">
            <Menu>Test</Menu>
          </Link>
          <Logout>
            <span onClick={onLogout}>로그아웃</span>
          </Logout>
        </Grid>
      </Wrapper>
    </>
  );
};

export default React.memo(UserMenu);
