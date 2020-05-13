import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router';
import ProgressBar from 'components/Progress/ProgressBar';
import Spinner from 'components/Common/Spinner';

const ListWrapper = styled.div`
  margin-top: 0.75rem;
  min-height: 80vh;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const TxItemWrapper = styled.div`
  height: 7rem;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0 0.125rem;
  display: flex;
  align-items: center;

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

const ProductInfo = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4rem;
  padding-right: 1.5rem;
`;

const Price = styled.div``;

const TxItem = ({
  photo,
  title,
  dDay,
  state,
  targetCount,
  count,
  postId,
  username,
  price,
}) => {
  const [status, setStatus] = useState(state);
  const date = moment(dDay).format('YYYY년 MM월 DD일');
  const history = useHistory();

  const onClick = () => {
    history.push(`/@${username}/${postId}`);
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
    <>
      <TxItemWrapper>
        <ItemImage onClick={onClick}>
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
        <ProductInfo>
          <Price>11/300</Price>
          <Price>11KLAY</Price>
          <Price>펀딩성공</Price>
        </ProductInfo>
      </TxItemWrapper>
    </>
  );
};

const OrderList = ({ buyerMakers, loading }) => {
  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
      </LoadingWrapper>
    );
  }

  return (
    <>
      <ListWrapper>
        {buyerMakers &&
          buyerMakers
            .slice(0, 8)
            .map(order => (
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
    </>
  );
};

export default React.memo(OrderList);
