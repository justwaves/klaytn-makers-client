import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/Header/Header';
import Responsive from 'components/Common/Responsive';
import Button from 'components/Common/Button';
import caver from 'klaytn/caver';
import { setFeed, uploadMakers } from 'redux/modules/makers';
import { useDispatch } from 'react-redux';
import contractAPI from 'klaytn/contractAPI';
import { getWallet } from 'lib/crypto';

const TestPage = () => {
  const [privateKey, setPrivateKey] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  // Baobab Account 및 Private Key 생성
  const generatePrivateKey = async () => {
    const account = await caver.klay.accounts.create();
    console.log(account);
    console.log(account.privateKey);
    setPrivateKey(account.privateKey);
  };

  const addWallet = async privateKey => {
    const walletInstance = await caver.klay.accounts.wallet.add(privateKey);
    console.log(walletInstance);
    setWalletAddress(walletInstance.address);
  };

  const getTotalKlayAmount = () => {
    contractAPI.methods
      .getTotalKlayAmount(1)
      .call()
      .then(receipt => {
        console.log(receipt);
      });
  };

  const dispatch = useDispatch();

  const klay = caver.utils.fromPeb(0x5d21dba00);

  const checkState = () => {
    console.log('check');
    contractAPI.methods
      .checkState()
      .send({
        from: getWallet().address,
        gas: '30000000',
      })
      .once('transactionHash', txHash => {
        console.log('txHash:', txHash);
      })
      .once('receipt', receipt => {
        console.log(receipt);
      })
      .once('error', error => {
        console.log('error: ', error);
      });
  };

  return (
    <Responsive>
      <Wrapper>
        <Header />
        <Divider />
        <ButtonWrapper>
          <Label>get makers</Label>
          <Button onClick={() => dispatch(setFeed())}>get makers</Button>
        </ButtonWrapper>
        <Divider />
        <ButtonWrapper>
          <Label>Upload fake makers</Label>
          <Button
            onClick={() =>
              dispatch(
                uploadMakers({
                  postId: 'postId',
                  title: 'title',
                  price: 1,
                  targetCount: 12,
                  dDay: 1588579156,
                }),
              )
            }
          >
            Upload
          </Button>
        </ButtonWrapper>
        <Divider />
        <button onClick={checkState}>checkState</button>
        <Divider />
        <button onClick={getTotalKlayAmount}>getTotalKlayAmount</button>
        <Divider />
        {klay}
        <Divider />
        <Divider />
        <ButtonWrapper>
          <Label>Baobab 계정 및 Private Key 생성</Label>
          <Button onClick={generatePrivateKey}>Private key 생성</Button>
          {privateKey && (
            <Data>
              private key:
              <br />
              <br /> {privateKey}
            </Data>
          )}
        </ButtonWrapper>
        <Divider />
        <ButtonWrapper>
          <Label>caver-js에 계정 추가</Label>
          <Button onClick={() => addWallet(privateKey)}>계정 추가</Button>
          {walletAddress && (
            <Data>
              address: <br />
              <br /> {walletAddress}
            </Data>
          )}
        </ButtonWrapper>
        <Divider />
      </Wrapper>
    </Responsive>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid #ccc;
  margin: 50px 0;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 60px;
`;

const Label = styled.div`
  padding: 15px 0;
  margin-bottom: 10px;
`;

const Data = styled.div`
  padding: 20px 0;
`;

export default TestPage;
