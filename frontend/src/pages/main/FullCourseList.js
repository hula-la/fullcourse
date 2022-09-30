import React from 'react';
import styled from 'styled-components';
import './main.css';
import CardComponent from '../../components/common/CardComponent';
import StyledButton from '../../components/common/StyledButton';
// mui에서 미디어쿼리 사용하는 방법
import { makeStyles, useMediaQuery } from '@material-ui/core';

//Card 관련
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Avatar from '@mui/joy/Avatar';
import CardOverflow from '@mui/joy/CardOverflow';
import { FaCommentDots } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';

const Container = styled.div`
  animation: fadeInUp 2s;
  margin: 10vh;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 5vh 2vh;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Text = styled.span`
  animation: fadeInUp 2s;
  height: 5vh;
  width: fit-content;
  background: url('/img/baseline.png') center no-repeat;
  background-position-y: 0;
  background-position-x: 0;
  background-size: 10rem 2.5rem;
  font-size: 2rem;
  font-family: Tmoney;
  color: #333333;
  text-align: left;
  padding: 0 7px;
  margin-right: 15px;
  line-height: 5vmin;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    line-height: 10vmin;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 2vh 3vw;
  overflow-x: auto;
`;



const FullCourseList = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  // carousel 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const fullcourseList = [
    {
      user: {
        userNickName: 'userNickname',
      },
      title: '풀코스 제목',
      day: 3,
      detail: '풀코스 상세 내용',
      lickCnt: 23,
      commentCnt: 13,
    },
    {
      user: {
        userNickName: 'userNickname',
      },
      title: '풀코스 제목',
      day: 3,
      detail: '풀코스 상세 내용',
      lickCnt: 23,
      commentCnt: 13,
    },
    {
      user: {
        userNickName: 'userNickname',
      },
      title: '풀코스 제목',
      day: 3,
      detail: '풀코스 상세 내용',
      lickCnt: 23,
      commentCnt: 13,
    },
  ];
  return (
    <div>
      {/* card fadeinup 시도해보자 */}
      <Container>
        <Title>
          <Text>추천 풀코스</Text>
          <StyledButton content="더보기" />
        </Title>
        {fullcourseList ? (
          <Flex>
            {fullcourseList.map((fullcourse, index) => {
              return <CardComponent key={index} fullcourse={fullcourse} />;
            })}
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default FullCourseList;
