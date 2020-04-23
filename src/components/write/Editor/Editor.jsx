import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import TextareaAutosize from "react-autosize-textarea";
import TagBox from "components/Write/TagBox/TagBoxContainer";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ImageDrop } from "quill-image-drop-module";

const Wrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  div {
    .MuiFormControl-marginNormal {
      margin-top: 0;
      border: 1px solid ${props => props.theme.color.gray[4]};
      border-radius: 4px;
      width: 16.5rem;
      padding: 0.5rem 1.75rem;

      .MuiInputBase-root {
        &::before {
          border: 0;
        }

        input {
          text-align: end;
        }
      }
    }
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 4rem;
  font-weight: 600;
  text-align: center;
`;

const Label = styled.h4`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.color.primary[4]};
  font-weight: 500;
`;

const EditorInput = styled.input`
  font-size: 1rem;
  outline: none;
  padding: 0.75rem 1rem;
  border: none;
  border: 1px solid ${props => props.theme.color.gray[3]};
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
`;

const TitleInput = styled(EditorInput)``;

const DescriptionInput = styled(TextareaAutosize)`
  border: 1px solid ${props => props.theme.color.gray[3]};
  border-radius: 4px;
  min-height: 100px;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  margin-bottom: 1rem;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.div`
  border: 1px solid ${props => props.theme.color.gray[4]};
  width: 16.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
`;

const PriceInput = styled(EditorInput)`
  width: 12.5rem;
  text-align: right;
  margin-bottom: 0;
  border: none;
`;

const TargetCountInput = styled(EditorInput)`
  width: 12.5rem;
  text-align: right;
  margin-bottom: 0;
  border: none;
`;

const Unit = styled.span`
  height: 100%;
  color: ${props => props.theme.color.gray[7]};
  width: 3rem;
`;

const Divider = styled.div`
  border-top: 1px solid ${props => props.theme.color.gray[5]};
  margin-bottom: 2rem;
  margin-top: 0.5rem;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 1rem;
  }

  .ql-editor.ql-blank::before {
    left: 0;
    font-size: 1rem;
  }
`;

const Editor = ({
  title,
  body,
  description,
  photo,
  price,
  targetCount,
  onChangeField,
  handleDateChange,
  selectedDate,
  onChange,
}) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  useEffect(() => {
    Quill.register("modules/imageDrop", ImageDrop);

    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "상품에 대한 자세한 내용을 적어주세요.",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
        imageDrop: true,
      },
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  return (
    <Wrapper>
      <PageTitle>상품 등록</PageTitle>
      <Label>상품명</Label>
      <TitleInput
        placeholder="상품명"
        onChange={onChange}
        value={title}
        name="title"
      />
      <Label>상품 설명</Label>
      <DescriptionInput
        placeholder="60자 이상 120자 이하"
        onChange={onChange}
        value={description}
        maxRows={3}
        maxlength={120}
        name="description"
      />
      <Label>사진 URL</Label>
      <TitleInput
        placeholder="https://"
        onChange={onChange}
        value={photo}
        name="photo"
      />
      <Label>상품 가격</Label>
      <InputContainer>
        <PriceInput
          placeholder="0"
          onChange={onChange}
          value={price}
          name="price"
        />
        <Unit>KLAY</Unit>
      </InputContainer>
      <Label>목표 수량</Label>
      <InputContainer>
        <TargetCountInput
          placeholder="0"
          onChange={onChange}
          value={targetCount}
          name="targetCount"
        />
        <Unit>EA</Unit>
      </InputContainer>
      <Label>마감일</Label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="left">
          <KeyboardDatePicker
            className="dDay"
            disableToolbar
            format="yyyy년 MM월 dd일"
            margin="normal"
            id="date-picker-dialog"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <TagBox />
      <Label>상품 상세 설명</Label>
      <Divider />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <Divider />
    </Wrapper>
  );
};

export default Editor;
