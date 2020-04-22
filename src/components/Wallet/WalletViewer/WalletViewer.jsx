import React from "react";
import styled from "styled-components";
import Responsive from "components/Common/Responsive";
import Button from "components/Common/Button";

const Wrapper = styled(Responsive)``;

const WalletViewer = ({ address, logout }) => {
  return (
    <Wrapper>
      <Button onClick={logout}>logout</Button>
    </Wrapper>
  );
};

export default WalletViewer;
