import React from "react";
import styled from "styled-components";
import WalletCardFrame from "./WalletCardFrame";
import TabsThree from "components/Common/TabsThree";
import ProgressBar from "components/Progress/ProgressBar";

const Wrapper = styled(WalletCardFrame)`
  min-height: 500px;
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
  height: 7rem;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  margin: 0 0.125rem;
  display: flex;
  align-items: center;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const ItemImage = styled.div`
  width: 6rem;
  height: 5.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.color.gray[3]};
  overflow: hidden;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
  }
`;

const ItemInfo = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.color.gray[7]};
  margin-left: 0.75rem;

  div {
    margin-bottom: 0.25rem;
  }
`;

const Title = styled.div`
  color: ${props => props.theme.color.primary[4]};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
const Date = styled.div`
  margin-top: 0.75rem;
`;
const Status = styled.div`
  margin-top: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  margin-top: 0.875rem;
  width: 11rem;
`;

const TxItem = ({ img, title, orderDate, status, targetCount, count }) => {
  return (
    <TxItemWrapper>
      <ItemImage>
        <img src={img} alt="item" />
      </ItemImage>
      <ItemInfo>
        <Title>{title}</Title>
        <Date>주문일시: {orderDate}</Date>
        <Status>진행상태: {status}</Status>
        <ProgressBarContainer>
          <ProgressBar
            cardView={false}
            targetCount={targetCount}
            count={count}
          />
        </ProgressBarContainer>
      </ItemInfo>
    </TxItemWrapper>
  );
};

const List = ({ myOrders }) => {
  if (!myOrders) {
    myOrders = [
      {
        img:
          "https://t1.daumcdn.net/makers_smith/file/items/100000543/masters/244daf861eb04604af90ee4cf3baed19.jpg?type=thumb&opt=C640x448.i",
        title: "탄력 회복, 먹는 콜라겐",
        orderDate: "2020.00.00",
        status: "진행중",
        targetCount: 16,
        count: 5,
        makersId: 1,
      },
      {
        img:
          "https://t1.daumcdn.net/makers_smith/file/items/100001551/masters/d516a56c87b44ffdad82266fc44f3594.jpg?type=thumb&opt=C640x448.i",
        title: "파운데이션",
        orderDate: "2020.00.00",
        status: "진행중",
        targetCount: 45,
        count: 5,
        makersId: 2,
      },
      {
        img:
          "https://t1.daumcdn.net/makers_smith/file/items/100001584/masters/432fc071093f4fdf99ef194e776562af.jpg?type=thumb&opt=C640x448.i",
        title: "박순애 명인의 옛 과자",
        orderDate: "2020.00.00",
        status: "완료",
        targetCount: 25,
        count: 15,
        makersId: 3,
      },
      {
        img:
          "https://t1.daumcdn.net/makers_smith/file/items/100001580/masters/0eb68955c62b486aa2e0873223fd5d65.jpg?type=thumb&opt=C640x448.i",
        title: "악마의 잼",
        orderDate: "2020.00.00",
        status: "완료",
        targetCount: 100,
        count: 5,
        makersId: 4,
      },
    ];
  }

  return (
    <ListWrapper>
      {myOrders &&
        myOrders.map(order => (
          <TxItem
            key={order.makersId}
            img={order.img}
            title={order.title}
            orderDate={order.orderDate}
            status={order.status}
            targetCount={order.targetCount}
            count={order.count}
          />
        ))}
    </ListWrapper>
  );
};

const Orders = () => (
  <Wrapper title="투자한 상품" more="주문상세보기">
    <TabsThree
      firstTabTitle="전체"
      secondTabTitle="진행중"
      thirdTabTitle="완료"
      firstContent={<List />}
      secondContent={<List />}
      thirdContent={<List />}
    />
    <More>더보기</More>
  </Wrapper>
);

export default Orders;
