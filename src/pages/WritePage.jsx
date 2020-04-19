import React from "react";
import styled from "styled-components";
import Editor from "components/write/Editor/EditorContainer";
import Responsive from "components/common/Responsive";

import WriteActionButtons from "components/write/WriteActionButtons/WriteActionButtonsContainer";
import Header from "components/common/Header/Header";

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
        <WriteActionButtons />
      </Wrapper>
    </Responsive>
  );
};
