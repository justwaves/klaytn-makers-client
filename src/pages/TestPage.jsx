import React, { useState } from "react";
import styled from "styled-components";
import Header from "components/Header/Header";
import Responsive from "components/Common/Responsive";
import Button from "components/Common/Button";
import caver from "klaytn/caver";
import WalletLink from "components/Wallet/WalletLink";
import { setFeed, uploadMakers } from "redux/modules/makers";
import { writeTx } from "redux/modules/tx";
import { useDispatch } from "react-redux";
import ProgressBar from "components/Progress/ProgressBar";
import Spinner from "components/Common/Spinner";
import TabsThree from "components/Common/TabsThree";
// import { Copy } from "components/Common/Icons";
import Copy from "components/Common/Copy";

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

const TabsContainer = styled.div`
  padding-top: 2.5rem;
`;

const TabsCard = styled.div`
  width: 360px;
  height: 500px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 1.5rem;
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

  // const makersId = 1;

  const klay = caver.utils.fromPeb(0x5d21dba00);

  return (
    <Responsive>
      <Wrapper>
        <Header />
        {klay}
        <Divider />
        <Copy></Copy>
        <Divider />
        <ButtonWrapper>
          <Label>트랜잭션 기록</Label>
          <Button
            onClick={() =>
              dispatch(
                writeTx({
                  type: "type1",
                  blockNumber: 1111,
                  blockHash: "blockHash1",
                  from: "from1",
                  to: "to1",
                  gas: "gas1",
                  gasPrice: "gasPrice1",
                  gasUsed: 11111,
                  transactionHash: "transactionHash1",
                }),
              )
            }
          >
            write tx
          </Button>
        </ButtonWrapper>
        <Divider />
        <TabsCard>
          <TabsContainer>
            <TabsThree></TabsThree>
          </TabsContainer>
        </TabsCard>
        <Divider />
        <Spinner />
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
