import React from "react";
import styled from "styled-components";
import { Lock } from "components/Common/Icons";
import Button from "components/Common/Button";

const Views = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.color.primary[4]};
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};
  padding: 0.5rem 0;
  margin-bottom: 2rem;

  svg {
    fill: ${props => props.theme.color.gray[7]};
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.25rem;
    margin-right: 0.75rem;
  }
`;

const SigninInput = styled.input`
  flex: 1;
  border: 0;
  margin-right: 0.5rem;
  font-size: 0.875rem;

  &::placeholder {
    color: ${props => props.theme.color.gray[5]};
  }
`;

const AccessButton = styled(Button)`
  width: 100%;
  height: 3rem;
  background-color: ${props => props.theme.color.primary[4]};
  margin-bottom: 2rem;
`;

const WalletLoginForm = () => {
  return (
    <Views>
      <Label>Sign in using private key</Label>
      <InputBox>
        <Lock />
        <SigninInput placeholder="Klaytn Wallet Key or Private Key" />
      </InputBox>
      <AccessButton cyan>Access</AccessButton>
    </Views>
  );
};

export default WalletLoginForm;
