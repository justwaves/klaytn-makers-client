import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/Header/Header";
import Responsive from "components/Common/Responsive";
import Button from "components/Common/Button";
import caver from "klaytn/caver";
import WalletLink from "components/Wallet/WalletLink";
import { setFeed, uploadMakers } from "redux/modules/makers";
import { useDispatch } from "react-redux";
import ProgressBar from "components/Progress/ProgressBar";

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

const TestPage = () => {
  const [privateKey, setPrivateKey] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const test = () => {};
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

  // const sendKlay = () => {
  //   caver.klay
  //     .sendTransaction({
  //       type: "VALUE_TRANSFER",
  //       from: walletAddress,
  //       to: "0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01",
  //       gas: "300000",
  //       value: 1,
  //     })
  //     .then(console.log);
  // };

  const dispatch = useDispatch();

  return (
    <Responsive>
      <Wrapper>
        <Header />
        <Divider />
        <ProgressBar targetCount={100} />
        <Divider />
        <ButtonWrapper>
          <Label>Upload fake makers</Label>
          <Button
            onClick={() =>
              dispatch(
                uploadMakers({
                  postId: "postId",
                  title: "title",
                  description: "description",
                  price: 11,
                  targetCount: 111,
                  dDay: "dDay",
                }),
              )
            }
          >
            Upload
          </Button>
        </ButtonWrapper>
        <Divider />
        <ButtonWrapper>
          <Label>get makers</Label>
          <Button onClick={() => dispatch(setFeed())}>get makers</Button>
        </ButtonWrapper>
        <Divider />
        <WalletLink />
        <Divider />
        <ButtonWrapper>
          <Label>test</Label>
          <Button onClick={test}>test</Button>
        </ButtonWrapper>
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

export default TestPage;