import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  ${props =>
    props.wrapper &&
    css`
      margin-top: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const SpinnerImage = styled.img`
  height: 2rem;
  animation: spinner 1.2s steps(12) infinite;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ wrapper }) => (
  <Wrapper wrapper={wrapper}>
    <SpinnerImage src={require("assets/images/loading.png")} alt="loading" />
  </Wrapper>
);

export default Spinner;
