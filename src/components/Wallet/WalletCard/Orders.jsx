import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import WalletCardFrame from './WalletCardFrame';
import TabsThree from 'components/Common/TabsThree';
import ProgressBar from 'components/Common/ProgressBar';
import Spinner from 'components/Common/Spinner';

const Wrapper = styled(WalletCardFrame)`
  min-height: 500px;
`;

const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.color.gray[4]};
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
  height: 7rem;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  margin: 0 0.125rem;
  display: flex;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
    /* transform: translateY(-0.125rem); */
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const ItemImage = styled.div`
  width: 6rem;
  height: 5.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.color.gray[2]};
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
  color: ${props => props.theme.color.gray[4]};
  margin-left: 0.75rem;

  div {
    margin-bottom: 0.25rem;
  }
`;

const Title = styled.div`
  color: ${props => props.theme.color.primary[3]};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Status = styled.div`
  margin-top: 0.75rem;
`;

const Date = styled.div`
  margin-top: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  margin-top: 0.875rem;
  width: 11rem;
`;

const TxItem = React.memo(
  ({ photo, title, dDay, state, targetCount, count, postId }) => {
    const [status, setStatus] = useState(state);
    const date = moment(dDay).format('YYYY년 MM월 DD일');
    const history = useHistory();

    const onClick = () => {
      history.push(`/product/${postId}`);
    };

    useEffect(() => {
      if (state === '0') {
        setStatus('진행중');
      } else if (state === '1') {
        setStatus('펀딩 성공');
      } else if (state === '2') {
        setStatus('펀딩 실패');
      }
    }, [state]);

    return (
      <TxItemWrapper onClick={onClick}>
        <ItemImage>
          <img src={photo} alt="item" />
        </ItemImage>
        <ItemInfo>
          <Title>{title}</Title>
          <Status>진행상태: {status}</Status>
          <Date>마감일: {date}</Date>
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
  },
);

const List = React.memo(({ buyerMakers, buyerMakersLoading, loading }) => {
  if ((!buyerMakers && buyerMakersLoading) || loading) {
    return (
      <ListWrapper>
        <span>
          <Spinner />
        </span>
      </ListWrapper>
    );
  }

  if (buyerMakers && buyerMakers.length === 0) {
    return (
      <ListWrapper>
        <span>상품이 없습니다.</span>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {buyerMakers &&
        buyerMakers.map(order => (
          <TxItem
            key={parseInt(order.timestamp) + parseInt(order.count)}
            photo={order.photo}
            title={order.title}
            dDay={order.dDay}
            state={order.state}
            targetCount={order.targetCount}
            count={order.count}
            postId={order._id}
            username={order.user.username}
          />
        ))}
    </ListWrapper>
  );
});

const Orders = ({
  buyerMakers,
  inProgressMakers,
  finisedMakers,
  loading,
  username,
}) => {
  const history = useHistory();
  const openOrderDetail = useCallback(() => {
    history.push(`/orders/${username}`);
  }, [history, username]);
  console.log(buyerMakers);

  return (
    <Wrapper title="투자한 상품" more="주문상세보기" onClick={openOrderDetail}>
      <TabsThree
        firstTabTitle="전체"
        secondTabTitle="진행중"
        thirdTabTitle="완료"
        firstContent={<List buyerMakers={buyerMakers} loading={loading} />}
        secondContent={<List buyerMakers={inProgressMakers} />}
        thirdContent={<List buyerMakers={finisedMakers} />}
      />
      <More onClick={openOrderDetail}>더보기</More>
    </Wrapper>
  );
};

export default React.memo(Orders);
