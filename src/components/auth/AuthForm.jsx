import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "components/common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};
  margin-bottom: 0.5rem;
`;

const AuthToggle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
  color: ${props => props.theme.color.gray[8]};
  cursor: pointer;
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;

const textMap = {
  login: "로그인",
  signup: "회원가입",
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
        {type === "signup" && (
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
        <StyledButton fullWidth>{textMap[type]}</StyledButton>
      </form>
      {type === "login" && <AuthToggle to="/signup">회원가입</AuthToggle>}
      {type === "signup" && <AuthToggle to="/login">로그인</AuthToggle>}
    </Wrapper>
  );
};

export default AuthForm;
