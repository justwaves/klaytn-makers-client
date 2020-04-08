import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${props => props.theme.color.gray[8]};
  &:hover {
    background: ${props => props.theme.color.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${props => props.theme.color.cyan[5]};
      &:hover {
        background: ${props => props.theme.color.cyan[4]};
      }
    `}

  &:disabled {
    background: ${props => props.theme.color.gray[3]};
    color: ${props => props.theme.color.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  const { to, cyan } = props;

  return to ? (
    <StyledLink {...props} cyan={cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
