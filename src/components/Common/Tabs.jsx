import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: white;
`;

const TabContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledButton = styled.button`
  outline: 0;
  border: 1px solid ${props => props.theme.color.gray[3]};
  border-bottom: 0;
  padding: 0;
  width: 50%;
  height: 100%;
  background-color: ${props => props.theme.color.gray[3]};
  color: ${props => props.theme.color.primary[4]};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;

  ${props =>
    props.active &&
    css`
      background-color: white;
      color: black;
    `}
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  min-height: 220px;
`;

const LeftContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;

  ${props =>
    props.tabKey === '2' &&
    css`
      transform: translateX(-120%);
    `}
`;

const RightContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;

  ${props =>
    props.tabKey === '1' &&
    css`
      transform: translateX(120%);
    `}
`;

const TabTitle = styled.div``;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3rem;
  position: relative;
`;

const BorderUnderTabs = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  background: white;
  /* height: 4px; */
`;

const ActiveTabBorder = styled.div`
  background: ${props => props.theme.color.primary[4]};
  height: 4px;
  width: 50%;
  position: absolute;
  top: 0;
  transition: all 0.3s ease-in;

  ${props =>
    props.active === 'left' &&
    css`
      transform: translateX(0px);
      border-right: 1px solid ${props => props.theme.color.gray[3]};
    `}

  ${props =>
    props.active === 'right' &&
    css`
      transform: translateX(100%);
      background: #229b9b;
      background: ${props => props.theme.color.green};
      border-left: 1px solid ${props => props.theme.color.gray[3]};
    `}
`;

const Tabs = ({
  newTabKey,
  leftTabTitle,
  rightTabTitle,
  leftContent,
  rightContent,
}) => {
  const [tabKey, setTabKey] = useState(newTabKey);

  useEffect(() => {
    setTabKey(newTabKey);
  }, [newTabKey]);

  const onPressTab = key => {
    setTabKey(key);
  };

  return (
    <Wrapper>
      <TabContainer>
        <Row>
          <StyledButton
            active={tabKey === '1' ? 1 : 0}
            onClick={() => onPressTab('1')}
          >
            <TabTitle>{leftTabTitle}</TabTitle>
          </StyledButton>
          <StyledButton
            active={tabKey === '2' ? 1 : 0}
            onClick={() => onPressTab('2')}
          >
            <TabTitle>{rightTabTitle}</TabTitle>
          </StyledButton>
          <BorderUnderTabs />
          <ActiveTabBorder active={tabKey === '1' ? 'left' : 'right'} />
        </Row>
        <ContentContainer>
          <LeftContent tabKey={tabKey}>{leftContent}</LeftContent>
          <RightContent tabKey={tabKey}>{rightContent}</RightContent>
        </ContentContainer>
      </TabContainer>
    </Wrapper>
  );
};

Tabs.defaultProps = {
  leftTabTitle: 'Tab 1',
  rightTabTitle: 'Tab 2',
  leftContent: 'Content 1',
  rightContent: 'Content 2',
  newTabKey: '1',
};

export default Tabs;
