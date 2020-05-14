import React from 'react';
import styled from 'styled-components';
import OrderList from './OrderList';

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
  color: ${props => props.theme.color.gray[7]};
`;

const Table = styled.div`
  margin-top: 1.5rem;
  border-top: 1.5px solid ${props => props.theme.color.gray[7]};
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
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightHeader = styled.div`
  flex: 1;
  border-bottom: 1px solid ${props => props.theme.color.gray[5]};
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

const OrderDetail = ({ buyerMakers, loading }) => {
  return (
    <Wrapper>
      <PageTitle>주문내역 조회</PageTitle>
      <TotalState>진행중 30 펀딩성공 12 펀딩실패 8</TotalState>
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
            <OrderList buyerMakers={buyerMakers} loading={loading} />
          </TableContent>
        </TableGrid>
      </Table>
    </Wrapper>
  );
};

export default React.memo(OrderDetail);
