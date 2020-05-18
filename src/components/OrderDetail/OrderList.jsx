import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ProgressBar from 'components/Common/ProgressBar';
import Spinner from 'components/Common/Spinner';
import { getRefund } from 'redux/modules/order';

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

const Info = styled.div`
  font-size: 0.875rem;
  text-align: center;
  min-width: 3rem;
`;

const State = styled.div`
  font-weight: 500;
`;

const ProgressState = styled.div`
  font-weight: 500;
  margin: 0 1.375rem;
`;

const StateButton = styled.button`
  border: 0;
  color: white;
  outline: none;
  padding: 0.25rem 1rem;
  background-color: ${props => props.theme.color.primary[0]};
  font-size: 0.875rem;
  margin-top: 0.75rem;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color.primary[3]};
  }
`;

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
  makersId,
}) => {
  const [status, setStatus] = useState(state);
  const date = moment(dDay).format('YYYY년 MM월 DD일');
  const history = useHistory();
  const dispatch = useDispatch();

  const onClick = () => {
    history.push(`/@${username}/${postId}`);
  };

  const onRefund = makersId => {
    dispatch(getRefund({ makersId }));
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
          <Info>
            {count}/{targetCount}
          </Info>
          <Info>{price} KLAY</Info>
          {state === '0' ? (
            <Info>
              <ProgressState> 진행중</ProgressState>
            </Info>
          ) : (
            <Info>
              <State>{state === '1' ? '펀딩성공' : '펀딩실패'}</State>

              {state === '1' ? (
                <StateButton>배송조회</StateButton>
              ) : (
                <StateButton onClick={() => onRefund(makersId)}>
                  환불받기
                </StateButton>
              )}
            </Info>
          )}
        </ProductInfo>
      </TxItemWrapper>
    </>
  );
};

const OrderList = ({ filteredList, loading }) => {
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
        {filteredList &&
          filteredList
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
                price={order.price}
                makersId={order.makersId}
              />
            ))}
      </ListWrapper>
    </>
  );
};

export default React.memo(OrderList);
