import React from "react";
import styled from "styled-components";
import moment from "moment";
import Responsive from "components/Common/Responsive";
import Tags from "components/Common/Tags";
import ProgressBar from "components/Progress/ProgressBar";
import Spinner from "components/Common/Spinner";

const ResponsiveWrapper = styled(Responsive)`
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;

  @media (max-width: 784px) {
    padding: 0 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.5rem;
  margin-bottom: 100px;

  position: relative;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LeftColumn = styled.div`
  /* outline: 1px solid red; */
`;

const RightColumn = styled.div`
  /* border: 1px solid ${props => props.theme.color.gray[4]}; */
  max-height: 30rem;
  position: sticky;
  top: 6.25rem;
  right: 0;
  border-radius: 4px;
  padding-top: 1rem;
  width: 100%;

  @media (max-width: 1200px) {
    width: 640px;
  }

  @media (max-width: 816px) {
    width: 100%; 
  }
`;

const ImageContainer = styled.div`
  max-height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const Content = styled.div`
  /* outline: 1px solid ${props => props.theme.color.gray[4]}; */
  height: 500px;
  margin-top: 1.5rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.color.primary[4]};
`;

const TagsContainer = styled.div`
  color: ${props => props.theme.color.primary[0]};
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Percentage = styled.div`
  color: ${props => props.theme.color.primary[0]};
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 3rem;

  @media (max-width: 1200px) {
    margin-top: 1.5rem;
  }
`;

const ProgressBarContainer = styled.div`
  margin-top: 1rem;
`;

const Order = styled.div`
  margin-top: 2rem;
  & + & {
    margin-top: 1.5rem;
  }
`;

const MinCount = styled.div`
  color: ${props => props.theme.color.gray[7]};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Count = styled.div`
  color: ${props => props.theme.color.primary[4]};
  font-weight: 500;
`;

const Period = styled.div`
  color: ${props => props.theme.color.gray[7]};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Dday = styled.div`
  color: ${props => props.theme.color.primary[4]};
  font-weight: 500;
`;

const Price = styled.div`
  color: ${props => props.theme.color.primary[0]};
  font-size: 1.5rem;
  font-weight: 600;
  text-align: end;
  margin-bottom: 4.5rem;
  position: absolute;
  bottom: 0;
  right: 20px;
  margin-top: 2rem;

  @media (max-width: 1200px) {
    position: relative;
  }
`;

const OrderButton = styled.button`
  background-color: ${props => props.theme.color.primary[0]};
  width: 100%;
  border: 0;
  border-radius: 4px;
  height: 3rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;

  @media (max-width: 1200px) {
    max-width: 640px;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    border-radius: 0;
  }
`;

// const Divider = styled.div`
//   border-bottom: 1px solid ${props => props.theme.color.gray[3]};
//   margin-top: 1.5rem;
// `;

const PostContent = styled.div`
  line-height: 1.6;
`;

const ProductViewer = ({ post, loading, error, actionButtons }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ResponsiveWrapper>존재하지 않는 포스트입니다.</ResponsiveWrapper>;
    }
    return <ResponsiveWrapper>오류 발생</ResponsiveWrapper>;
  }

  if (loading || !post) {
    return <Spinner wrapper />;
  }

  const {
    title,
    body,
    tags,
    // user,
    photo,
    price,
    count = 5,
    targetCount,
    publishedDate,
    dDay,
  } = post;

  console.log(post);

  moment.updateLocale("en", {
    relativeTime: {
      future: "%s 남음",
      past: "%s 지남",
      s: "1초",
      ss: "%d초",
      m: "1분",
      mm: "%d분",
      h: "1시간",
      hh: "%d시간",
      d: "1일",
      dd: "%d일",
      M: "1개월",
      MM: "%d개월",
      y: "1년",
      yy: "%d년",
    },
  });

  let fromNow = moment(dDay, "YYYY-MM-DD").fromNow();

  if (fromNow === 0) {
    fromNow = moment(dDay, "LTS").fromNow();
  }

  console.log(moment(publishedDate) > moment(dDay));

  const percentage = Math.ceil((count / targetCount) * 100);

  return (
    <ResponsiveWrapper>
      <Grid>
        <LeftColumn>
          <ImageContainer>
            <img src={photo} alt="main" />
          </ImageContainer>
          <Content>
            <PostContent dangerouslySetInnerHTML={{ __html: body }} />
          </Content>
        </LeftColumn>
        <RightColumn>
          <Title>{title}</Title>
          <TagsContainer>
            <Tags tags={tags} />
          </TagsContainer>
          <Percentage>{percentage}%</Percentage>
          <ProgressBarContainer>
            <ProgressBar
              targetCount={targetCount}
              cardView={false}
              count={count}
            />
          </ProgressBarContainer>
          <Order>
            <MinCount>
              제품제작에 필요한 최소 주문수량: {targetCount}개
            </MinCount>
            <Count>{count}명 주문중</Count>
          </Order>
          <Order>
            <Period>
              펀딩기간: {publishedDate.split("T", 1)[0]} ~{" "}
              {dDay.split("T", 1)[0]}
            </Period>
            <Dday>주문종료 {fromNow}</Dday>
          </Order>
          <Price>{price} KLAY</Price>
          <OrderButton>주문하기</OrderButton>
        </RightColumn>
        {actionButtons}
      </Grid>
    </ResponsiveWrapper>
  );
};

export default ProductViewer;
