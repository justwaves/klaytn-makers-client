import React from "react";
import Editor from "components/write/Editor/EditorContainer";
import Responsive from "components/common/Responsive";
import TagBox from "components/write/TagBox/TagBoxContainer";
import WriteActionButtons from "components/write/WriteActionButtons/WriteActionButtonsContainer";

export default () => {
  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
};
