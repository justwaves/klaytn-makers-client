import React from "react";
import styled from "styled-components";
import WalletCardFrame from "./WalletCardFrame";

const Wrapper = styled(WalletCardFrame)`
  height: 400px;
`;

const TxList = () => (
  <Wrapper title="트랜잭션 리스트" more="Klaytnscope">
    <>TxList</>
  </Wrapper>
);

export default TxList;
