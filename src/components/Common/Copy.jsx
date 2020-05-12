import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from './Icons';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const CopyContainer = styled.span`
  cursor: pointer;
`;

const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  top: -7px;
  left: -5px;
  opacity: 0;
  transition: all 0.3s ease-out;

  ${props =>
    props.open &&
    css`
      opacity: 1;
    `}
`;

const Tooltip = styled.div`
  width: 60px;
  height: 30px;
  border: 1px solid ${props => props.theme.color.gray[7]};
  position: absolute;
  top: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  z-index: 2;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 0.625rem;
  height: 0.625rem;
  border-bottom: 1px solid ${props => props.theme.color.gray[7]};
  border-right: 1px solid ${props => props.theme.color.gray[7]};
  transform: rotate(45deg);
  background-color: ${props => props.theme.color.gray[0]};
  user-select: none;
  position: absolute;
  top: -15px;
  z-index: 3;
`;

const TooltipText = styled.p`
  font-size: 0.875rem;
`;

export default ({ text, children, isIcon = true }) => {
  const [open, setOpen] = React.useState(false);
  const [privateKey, setPrivateKey] = useState(text);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    setPrivateKey(text);
  }, [text]);

  return (
    <Wrapper>
      <TooltipWrapper open={open} onClickAway={handleTooltipClose}>
        <Arrow />
        <Tooltip>
          <TooltipText>copied</TooltipText>
        </Tooltip>
      </TooltipWrapper>
      <CopyToClipboard text={privateKey}>
        <CopyContainer onClick={handleTooltipOpen}>
          {isIcon ? <Copy /> : children}
        </CopyContainer>
      </CopyToClipboard>
    </Wrapper>
  );
};
