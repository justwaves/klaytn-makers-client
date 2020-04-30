import React from "react";
import styled, { css } from "styled-components";
import WalletCardFrame from "./WalletCardFrame";
import TabsThree from "components/Common/TabsThree";
import { Purchase, /* Refund, */ Reward } from "components/Common/Icons";

const Wrapper = styled(WalletCardFrame)`
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
  align-items: flex-end;

  span {
    font-size: 0.75rem;
    margin-left: 0.25rem;
  }

  ${props =>
    props.red &&
    css`
      color: #ea5f76;
    `}
`;
// Purchase  Refund  Reward
const TxItem = ({ title, date, klay, red }) => {
  return (
    <TxItemWrapper>
      <IconContainer>{red ? <Purchase /> : <Reward />}</IconContainer>
      <TxInfo>
        <TxTitle>{title}</TxTitle>
        <TxDate>{date}</TxDate>
      </TxInfo>
      <TxKlay red={red}>
        {klay} <span>KLAY</span>
      </TxKlay>
    </TxItemWrapper>
  );
};

const List = ({ txList }) => {
  if (!txList) {
    txList = [
      {
        id: 1,
        title: "상품 구매",
        date: "2020.04.28 12:00",
        klay: "- 12.1231",
        red: true,
      },
      {
        id: 2,
        title: "환불",
        date: "2020.04.28 12:00",
        klay: "+ 8.1231",
        red: false,
      },
      {
        id: 3,
        title: "보상",
        date: "2020.04.28 12:00",
        klay: "+ 2.1231",
        red: false,
      },
      {
        id: 4,
        title: "상품 구매",
        date: "2020.04.28 12:00",
        klay: "- 6.1231",
        red: true,
      },
    ];
  }

  return (
    <ListWrapper>
      {txList &&
        txList.map(tx => (
          <TxItem
            key={tx.id}
            title={tx.title}
            date={tx.date}
            klay={tx.klay}
            red={tx.red}
          />
        ))}
    </ListWrapper>
  );
};

const TxList = ({ txList }) => {
  return (
    <Wrapper title="트랜잭션 리스트" more="Klaytnscope">
      <TabsThree
        firstTabTitle="전체"
        secondTabTitle="지출"
        thirdTabTitle="수입"
        firstContent={<List txList={txList} />}
        secondContent={<List txList={txList} />}
        thirdContent={<List txList={txList} />}
      />
      <More>더보기</More>
    </Wrapper>
  );
};

export default TxList;
