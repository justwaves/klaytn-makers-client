import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "components/common/Responsive";
import Button from "components/common/Button";
import SubInfo from "components/common/SubInfo";
import Tags from "components/common/Tags";

const Wrapper = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:first-child {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${props => props.theme.color.gray[2]};
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 0;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.color.gray[6]};
  }
`;

const Content = styled.p`
  margin-top: 2rem;
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;

  return (
    <PostItemWrapper>
      <Title>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </Title>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <Content>{body}</Content>
    </PostItemWrapper>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  if (error) {
    return <Wrapper>에러가 발생했습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>

      {!loading && posts && (
        <div>
          {posts.map(post => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default PostList;
