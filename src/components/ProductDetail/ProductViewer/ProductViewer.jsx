import React from "react";
import styled from "styled-components";
import Responsive from "components/Common/Responsive";
import Tags from "components/Common/Tags";

const Wrapper = styled(Responsive)`
  margin-top: 2rem;
  max-width: 46.5rem;

  @media (max-width: 784px) {
    padding: 0 20px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 1rem;
`;

const Price = styled.div`
  margin-bottom: 1rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${props => props.theme.color.gray[3]};
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.color.gray[8]};
  margin-bottom: 3rem;
`;

const ProductViewer = ({ post, loading, error, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <Wrapper>존재하지 않는 포스트입니다.</Wrapper>;
    }
    return <Wrapper>오류 발생1</Wrapper>;
  }
  if (loading || !post) {
    return null;
  }

  const {
    title,
    body,
    tags,
    // user,
    photo,
    price,
    // targetCount,
    // dDay,
  } = post;

  return (
    <Wrapper>
      <PostHead>
        <ImageContainer>
          <img src={photo} alt="main" />
        </ImageContainer>
        <Title>{title}</Title>
        <Price>{price} KLAY</Price>
        <Tags tags={tags} />
      </PostHead>
      <Divider />
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      {actionButtons}
    </Wrapper>
  );
};

export default ProductViewer;
