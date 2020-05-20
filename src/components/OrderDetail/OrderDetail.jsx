import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderList from './OrderList';
import { buyerMakerFilter } from 'lib/sort';

const Wrapper = styled.div`
  width: 46.5rem;
  min-height: 90vh;
  margin: 0 auto;
  margin-top: 4rem;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const TotalState = styled.h3`
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.color.gray[4]};
  display: flex;
  div {
    margin-right: 1.5rem;
  }
`;

const Table = styled.div`
  margin-top: 1.5rem;
  border-top: 1.5px solid ${props => props.theme.color.gray[4]};
`;

const TableGrid = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
`;

const TableHeader = styled.div`
  display: flex;
  font-size: 0.875rem;
`;

const LeftHeader = styled.div`
  width: 320px;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightHeader = styled.div`
  flex: 1;
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 4rem;
  padding-left: 2rem;

  div {
    &:nth-child(2) {
      margin-right: 2.25rem;
    }
  }
`;

const TableContent = styled.div``;

const OrderDetail = ({ loading, feed, combinedOrderList }) => {
  const [inProgressList, setInProgressList] = useState([]);
  const [successList, setSuccessList] = useState([]);
  const [failureList, setFailureList] = useState([]);
  const [totalList, setTotalList] = useState([]);

  useEffect(() => {
    if (combinedOrderList && feed) {
      const arr = buyerMakerFilter(combinedOrderList, feed);
      setInProgressList(arr.filter(product => product.state === '0'));
      setSuccessList(arr.filter(product => product.state === '1'));
      setFailureList(arr.filter(product => product.state === '2'));
      setTotalList(arr.filter(product => product.state !== '3'));
    }
  }, [combinedOrderList, feed]);

  return (
    <Wrapper>
      <PageTitle>주문내역 조회</PageTitle>
      <TotalState>
        <div>진행중 {inProgressList.length}</div>
        <div>펀딩성공 {successList.length}</div>
        <div>펀딩실패 {failureList.length}</div>
      </TotalState>
      <Table>
        <TableGrid>
          <TableHeader>
            <LeftHeader>상품정보</LeftHeader>
            <RightHeader>
              <div>주문수/목표</div>
              <div>가격</div>
              <div>상태</div>
            </RightHeader>
          </TableHeader>

          <TableContent>
            <OrderList filteredList={totalList.reverse()} loading={loading} />
          </TableContent>
        </TableGrid>
      </Table>
    </Wrapper>
  );
};

export default React.memo(OrderDetail);
