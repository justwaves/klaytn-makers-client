import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 2.25rem;
  padding-right: 2.25rem;
  width: ${props => props.theme.width.container};
  margin: 0 auto;
  min-width: 360px;

  @media (max-width: 1200px) {
    width: 816px;
  }

  @media (max-width: 816px) {
    width: 552px;
    padding-left: 0rem;
    padding-right: 0rem;
  }

  @media (max-width: 552px) {
    width: 100%;
    padding-left: 0rem;
    padding-right: 0rem;
  }

  /* @media (max-width: 744px) {
    width: 432px;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 432px) {
  } */
`;

const Responsive = ({ children, ...rest }) => (
  <Wrapper {...rest}>{children}</Wrapper>
);

export default Responsive;
