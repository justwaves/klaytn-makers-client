import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import WalletCardFrame from "./WalletCardFrame";
import TabsThree from "components/Common/TabsThree";
import { Purchase, /* Refund, */ Reward } from "components/Common/Icons";
import Spinner from "components/Common/Spinner";
import { KLAYTN_SCOPE } from "constants/url";

const StyledWalletCardFrame = styled(WalletCardFrame)`
  min-height: 400px;
`;

const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.color.gray[7]};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  margin-top: 0.75rem;

  span {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
`;

const TxItemWrapper = styled.div`
  height: 4rem;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0.125rem;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${props => props.theme.color.gray[3]};
  border-radius: 50%;
  margin-right: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${props => props.theme.color.primary[4]};
  }
`;

const TxInfo = styled.div``;

const TxTitle = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.color.primary[4]};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TxDate = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.color.gray[6]};
  font-weight: 500;
`;

const TxKlay = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  color: ${props => props.theme.color.primary[0]};
  align-items: center;

  span {
    font-size: 0.75rem;
    margin-left: 0.25rem;
    margin-bottom: 0.75rem;
  }

  ${props =>
    props.red === 0 &&
    css`
      color: ${props => props.theme.color.cyan};
    `}

  ${props =>
    props.red &&
    css`
      color: ${props => props.theme.color.lightRed};
    `}
`;

// Purchase  Refund  Reward
const TxItem = ({ title, date, klay, TxFee, txHash }) => {
  const [totalKlay, setTotalKlay] = useState(0);
  const txDate = moment(date).format("YYYY년 MM월 DD일");

  useEffect(() => {
    if (TxFee) {
      setTotalKlay(JSON.stringify(klay + TxFee).slice(0, 7));
    }
  }, [TxFee, klay]);

  const openScope = txHash => {
    window.open(`${KLAYTN_SCOPE}tx/${txHash}`, "_blank");
  };

  return (
    <TxItemWrapper onClick={() => openScope(txHash)}>
      <IconContainer>{klay ? <Purchase /> : <Reward />}</IconContainer>
      <TxInfo>
        <TxTitle>{title}</TxTitle>
        <TxDate>{txDate}</TxDate>
      </TxInfo>
      <TxKlay red={klay}>
        {totalKlay} <span>KLAY</span>
      </TxKlay>
    </TxItemWrapper>
  );
};

const List = ({ txList, txListLoading }) => {
  if (txListLoading) {
    return (
      <ListWrapper>
        <span>
          <Spinner />
        </span>
      </ListWrapper>
    );
  }

  if (txList && txList.length === 0) {
    return (
      <ListWrapper>
        <span>트랜잭션이 없습니다.</span>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {txList &&
        txList.map(tx => (
          <TxItem
            key={tx.id}
            title={tx.typeName}
            date={tx.publishedDate}
            klay={tx.klay}
            TxFee={tx.TxFee}
            txHash={tx.transactionHash}
          />
        ))}
    </ListWrapper>
  );
};

const TxList = ({ txList, txListLoading }) => {
  const [minusTxList, setMinusTxlist] = useState(null);
  const [plusTxList, setPlusTxlist] = useState(null);

  const openKlayscope = () => {
    window.open("https://baobab.scope.klaytn.com/", "_blank");
  };

  useEffect(() => {
    if (txList) {
      const plusList = txList.filter(tx => tx.klay > 0);
      setPlusTxlist(plusList);
      const minusList = txList.filter(tx => tx.klay < 0);
      setMinusTxlist(minusList);
    }
  }, [txList]);

  return (
    <StyledWalletCardFrame
      title="트랜잭션 리스트"
      more="Klaytnscope"
      onClick={openKlayscope}
    >
      <TabsThree
        firstTabTitle="전체"
        secondTabTitle="지출"
        thirdTabTitle="수입"
        firstContent={<List txList={txList} txListLoading={txListLoading} />}
        secondContent={<List txList={minusTxList} />}
        thirdContent={<List txList={plusTxList} />}
      />
      <More>더보기</More>
    </StyledWalletCardFrame>
  );
};

export default TxList;
