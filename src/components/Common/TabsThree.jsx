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
  border: 0;
  border-bottom: 1px solid ${props => props.theme.color.gray[2]};
  padding: 0;
  width: 50%;
  height: 100%;
  color: ${props => props.theme.color.primary[3]};
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  background-color: ${props => props.theme.color.gray[0]};
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 370px;
  height: 100%;
  background-color: ${props => props.theme.color.gray[0]};
  overflow: hidden;
`;

const FirstContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;

  ${props =>
    props.tabKey === '2' &&
    css`
      transform: translateX(-120%);
    `}
  ${props =>
    props.tabKey === '3' &&
    css`
      transform: translateX(-220%);
    `}
`;

const SecondContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;

  ${props =>
    props.tabKey === '1' &&
    css`
      transform: translateX(120%);
    `}
  ${props =>
    props.tabKey === '3' &&
    css`
      transform: translateX(-120%);
    `}
`;

const ThirdContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;

  ${props =>
    props.tabKey === '1' &&
    css`
      transform: translateX(220%);
    `}

  ${props =>
    props.tabKey === '2' &&
    css`
      transform: translateX(120%);
    `}
`;

const TabTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 2.5rem;
  position: relative;
`;

const BorderUnderTabs = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: white;
  /* height: 4px; */
`;

const ActiveTabBorder = styled.div`
  background: ${props => props.theme.color.primary[3]};
  height: 3px;
  width: 33.33%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease-in;

  ${props =>
    props.active === '1' &&
    css`
      transform: translateX(0px);
      border-right: 1px solid ${props => props.theme.color.gray[2]};
    `}

  ${props =>
    props.active === '2' &&
    css`
      transform: translateX(100%);
    `}

  ${props =>
    props.active === '3' &&
    css`
      transform: translateX(200%);
    `}
`;

const TabsThree = ({
  newTabKey,
  firstTabTitle,
  secondTabTitle,
  thirdTabTitle,
  firstContent,
  secondContent,
  thirdContent,
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
            <TabTitle>{firstTabTitle}</TabTitle>
          </StyledButton>
          <StyledButton
            active={tabKey === '2' ? 1 : 0}
            onClick={() => onPressTab('2')}
          >
            <TabTitle>{secondTabTitle}</TabTitle>
          </StyledButton>
          <StyledButton
            active={tabKey === '3' ? 1 : 0}
            onClick={() => onPressTab('3')}
          >
            <TabTitle>{thirdTabTitle}</TabTitle>
          </StyledButton>
          <BorderUnderTabs />
          <ActiveTabBorder active={tabKey} />
        </Row>
        <ContentContainer>
          <FirstContent tabKey={tabKey}>{firstContent}</FirstContent>
          <SecondContent tabKey={tabKey}>{secondContent}</SecondContent>
          <ThirdContent tabKey={tabKey}>{thirdContent}</ThirdContent>
        </ContentContainer>
      </TabContainer>
    </Wrapper>
  );
};

TabsThree.defaultProps = {
  firstTabTitle: 'Tab 1',
  secondTabTitle: 'Tab 2',
  thirdTabTitle: 'Tab 3',
  firstContent: 'Content 1',
  secondContent: 'Content 2',
  thirdContent: 'Content 3',
  newTabKey: '1',
};

export default TabsThree;
