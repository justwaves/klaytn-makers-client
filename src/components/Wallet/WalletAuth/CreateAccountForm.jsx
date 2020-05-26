import React, { useState } from 'react';
import styled from 'styled-components';
import caver from 'klaytn/caver';
import Copy from 'components/Common/Copy';
import Button from 'components/Common/Button';

const Views = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  padding: 0.5rem 0;
  margin-bottom: 2rem;

  svg {
    fill: ${props => props.theme.color.gray[4]};
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
  font-size: 13px;

  &::placeholder {
    color: ${props => props.theme.color.gray[3]};
  }
`;

const AccessButton = styled(Button)`
  width: 100%;
  height: 3rem;
  background: ${props => props.theme.color.secondary[1]};
  margin-bottom: 2rem;

  &:hover {
    background-color: #229b9b;
  }
`;

const CopyButton = styled.div`
  margin-right: 0.5rem;
`;

const CreateAccountForm = () => {
  const [privateKey, setPrivateKey] = useState(null);

  const generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create();
    setPrivateKey(privateKey);
  };

  return (
    <Views>
      <Label>Please Save Your Klaytn Wallet Private Key</Label>
      <InputBox>
        <SigninInput
          placeholder="New Klaytn Private Key"
          value={privateKey || ''}
          readOnly
        />
        <CopyButton>
          <Copy text={privateKey} />
        </CopyButton>
      </InputBox>
      <AccessButton onClick={generatePrivateKey}>
        Generate Private Key
      </AccessButton>
    </Views>
  );
};

export default CreateAccountForm;
