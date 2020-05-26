import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Lock } from 'components/Common/Icons';
import Button from 'components/Common/Button';
import { walletLogin } from 'redux/modules/wallet';
import { hideModal } from 'redux/modules/ui';

const Views = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.color.primary[3]};
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
  background-color: ${props => props.theme.color.primary[3]};
  margin-bottom: 2rem;
`;

const WalletLoginForm = () => {
  const [privateKey, setPrivateKey] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { hasWallet, username } = useSelector(({ wallet, user }) => ({
    hasWallet: wallet.hasWallet,
    username: user.user.username,
  }));

  const onwalletLogin = useCallback(
    privateKey => {
      console.log(privateKey);
      dispatch(walletLogin(privateKey));
    },
    [dispatch],
  );

  const onChange = e => {
    setPrivateKey(e.target.value);
  };

  useEffect(() => {
    if (hasWallet) {
      history.push(`/wallet/${username}`);
      dispatch(hideModal());
    }
  }, [hasWallet, history, dispatch, username]);

  return (
    <Views>
      <Label>Sign in using private key</Label>
      <InputBox>
        <Lock />
        <SigninInput
          placeholder="Klaytn Wallet Key or Private Key"
          onChange={onChange}
          value={privateKey}
        />
      </InputBox>
      <AccessButton cyan onClick={() => onwalletLogin(privateKey)}>
        Access
      </AccessButton>
    </Views>
  );
};

export default WalletLoginForm;
