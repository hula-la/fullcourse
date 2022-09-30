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

// const Nickname = styled.div`
//   font-family: Tmoney;
//   font-size: 1vmin;
//   color: #333333;
//   text-align: center;
// `;

// const CardTitle = styled.div`
//   font-family: Tmoney;
//   font-size: 4vmin;
//   color: #333333;
//   margin-top: 2vh;
// `;

// const CardContent = styled.div`
//   font-family: Tmoney;
//   font-size: 2vmin;
//   color: #333333;
//   margin-top: 1vh;
// `;

// const CardFooter = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 2vh;

//   span {
//     font-family: Tmoney;
//     font-size: 1vmin;
//     margin-right: 1vw;
//   }
// `;

// const Like = styled(GoHeart)`
//   color: #e36387;
//   font-size: 2.5vmin;
// `;
// const Comment = styled(FaCommentDots)`
//   color: #e36387;
//   font-size: 2.2vmin;
// `;

// const CardComponent =()=>{
//   const classes = useStyles();
//   const isMobile = useMediaQuery('(max-width: 600px)');
//   return (
//     <div>
//       <Card
//           className={isMobile ? classes.cardMobile : null}
//           variant="soft"

//           sx={{
//             width: '16.5vw',
//             // boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 10%);' }}, 스투비플래너 카드 예시
//             boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
//             marginTop: '10vh',
//             ":hover": {transform: 'scale(1.05)', cursor:'pointer'},
//             ":active": {transform: 'scale(0.95)'},

//           }}
//         >
//           <CardOverflow>
//             <AspectRatio ratio="3">
//               <img
//                 src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270"
//                 alt="card main img"
//               />
//             </AspectRatio>

//             <Avatar
//               src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270"
//               size="lg"
//               sx={{
//                 position: 'absolute',
//                 zIndex: 2,
//                 right: '7.7vw',
//                 bottom: 0,
//                 transform: 'translateY(50%)',
//                 border: "2px solid white"
//               }}
//             ></Avatar>
//           </CardOverflow>
//           <CardOverflow
//             variant="soft"
//             sx={{
//               display: 'flex-column',
//               textAlign: 'start',
//               // gap: 1.5,
//               py: 3,
//               px: 'var(--Card-padding)',
//               // borderTop: '1px solid',
//               // borderColor: 'neutral.outlinedBorder',
//               // bgcolor: 'background.level1',
//               marginTop: '0',
//               paddingTop: '4vh',
//             }}
//           >
//             <Nickname>닉네임1</Nickname>
//             <CardTitle>제목1</CardTitle>
//             <CardContent>내용1</CardContent>
//             {/* 이 자리에 호준이가 만든 태그 */}

//             <CardFooter>
//               <Like />
//               <span>좋아요횟수</span>
//               <Comment />
//               <span>댓글갯수</span>
//             </CardFooter>
//           </CardOverflow>
//         </Card>
//     </div>
//   )
// }

const CardComponent = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div>
      <Card
        className={isMobile ? classes.cardMobile : null}
        variant="soft"
        sx={{
          width: '16.5vw',
          // boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 10%);' }}, 스투비플래너 카드 예시
          boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
          marginTop: '10vh',
          ':hover': { transform: 'scale(1.05)', cursor: 'pointer' },
          ':active': { transform: 'scale(0.95)' },
          background: '#FFF3F8',
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="3">
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270"
              alt="card main img"
            />
          </AspectRatio>

          <Avatar
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270"
            size="lg"
            sx={{
              position: 'absolute',
              zIndex: 2,
              right: '7.7vw',
              bottom: 0,
              transform: 'translateY(50%)',
              border: '2px solid white',
            }}
          ></Avatar>
        </CardOverflow>
        <CardOverflow
          variant="soft"
          sx={{
            display: 'flex-column',
            textAlign: 'start',
            // gap: 1.5,
            py: 3,
            px: 'var(--Card-padding)',
            // borderTop: '1px solid',
            // borderColor: 'neutral.outlinedBorder',
            // bgcolor: 'background.level1',
            marginTop: '0',
            paddingTop: '4vh',
          }}
        >
          <Nickname>닉네임1</Nickname>
          <CardTitle>제목1</CardTitle>
          <CardContent>내용1</CardContent>
          {/* 이 자리에 호준이가 만든 태그 */}

          <CardFooter>
            <Like />
            <span>좋아요횟수</span>
            <Comment />
            <span>댓글갯수</span>
          </CardFooter>
        </CardOverflow>
      </Card>
    </div>
  );
};

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
