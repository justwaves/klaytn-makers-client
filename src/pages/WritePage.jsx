import React from 'react';
import styled from 'styled-components';
import Editor from 'components/Write/Editor/EditorContainer';
import Responsive from 'components/Common/Responsive';

import WriteActionButtonsContainer from 'components/Write/WriteActionButtons/WriteActionButtonsContainer';
import Header from 'components/Header/Header';

const Wrapper = styled.div`
  max-width: 816px;
  margin: 0 auto;
  padding: 36px;
`;

export default () => {
  return (
    <Responsive>
      <Header />
      <Wrapper>
        <Editor />
        <WriteActionButtonsContainer />
      </Wrapper>
    </Responsive>
  );
};
