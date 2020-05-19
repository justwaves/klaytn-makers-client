import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/Common/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 360px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3.5rem;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const LoginToggleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const AuthToggle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 400;
  color: ${props => props.theme.color.gray[4]};
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;

const ForgotPwd = styled.div`
  width: 50%;
  color: ${props => props.theme.color.gray[4]};
`;

const textMap = {
  login: '로그인',
  signup: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  return (
    <Wrapper>
      <Title>{textMap[type]}</Title>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="off"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <StyledInput
          autoComplete="off"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
        />
        {type === 'signup' && (
          <StyledInput
            autoComplete="off"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={onChange}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton cyan fullWidth>
          {textMap[type]}
        </StyledButton>
      </form>
      {type === 'login' && (
        <LoginToggleWrapper>
          <ForgotPwd>비밀번호 찾기</ForgotPwd>
          <AuthToggle to="/signup">회원가입</AuthToggle>
        </LoginToggleWrapper>
      )}
      {type === 'signup' && <AuthToggle to="/login">로그인</AuthToggle>}
    </Wrapper>
  );
};

export default AuthForm;
