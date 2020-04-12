import React from "react";
import styled from "styled-components";
import Responsive from "components/common/Responsive";
import SubInfo from "components/common/SubInfo";
import Tags from "components/common/Tags";

const Wrapper = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${props => props.theme.color.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  font-size: 3rem;
  line-height: 1.5;
  margin: 0;
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${props => props.theme.color.gray[8]};
`;

const PostViewer = ({ post, loading, error, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <Wrapper>존재하지 않는 포스트입니다.</Wrapper>;
    }
    return <Wrapper>오류 발생1</Wrapper>;
  }
  if (loading || !post) {
    return null;
  }

  const { title, body, tags, user, publishedDate } = post;

  return (
    <Wrapper>
      <PostHead>
        <Title>{title}</Title>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </Wrapper>
  );
};

export default PostViewer;
