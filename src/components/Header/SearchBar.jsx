import React from "react";
import styled from "styled-components";
import { Search } from "components/Common/Icons";

const Wrapper = styled.div`
  height: 2rem;
  width: 14rem;
  border: 1px solid ${props => props.theme.color.gray[5]};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 816px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  padding-right: 6px;
  color: ${props => props.theme.color.gray[5]};

  svg {
    fill: currentColor;
  }
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 0;
  margin: 0;
  margin-left: 12px;
  border: 0;
`;

const SearchBar = () => (
  <Wrapper>
    <StyledInput placeholder="검색" />
    <IconContainer>
      <Search />
    </IconContainer>
  </Wrapper>
);

export default SearchBar;
