import React from "react";
import styled from "styled-components";
import WalletCardFrame from "./WalletCardFrame";

const Wrapper = styled(WalletCardFrame)`
  height: 400px;
`;

const Orders = () => (
  <Wrapper title="투자한 상품" more="주문상세보기">
    <>Orders</>
  </Wrapper>
);

export default Orders;
