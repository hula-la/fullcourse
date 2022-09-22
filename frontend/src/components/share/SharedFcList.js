import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharedFc } from '../../features/share/shareActions';
import styled from 'styled-components';
import './main.css';

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
  /* display: flex; */
`;

const Text = styled.div`
  animation: fadeInUp 2s;
  height: 4vh;
  width: 25vw;
  background: url('/img/baseline.png') center no-repeat;
  background-position-y: 0;
  background-position-x: 0;

  background-size: 10vw 5vh;
  font-size: 4vmin;
  font-family: Tmoney;
  color: #333333;
  text-align: start;
  padding: 0;
`;

const Nickname = styled.div`
  font-family: Tmoney;
  font-size: 1vmin;
  color: #333333;
  text-align: center;
`;

const CardTitle = styled.div`
  font-family: Tmoney;
  font-size: 4vmin;
  color: #333333;
  margin-top: 2vh;
`;

const CardContent = styled.div`
  font-family: Tmoney;
  font-size: 2vmin;
  color: #333333;
  margin-top: 1vh;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vh;

  span {
    font-family: Tmoney;
    font-size: 1vmin;
    margin-right: 1vw;
  }
`;

const Like = styled(GoHeart)`
  color: #e36387;
  font-size: 2.5vmin;
`;
const Comment = styled(FaCommentDots)`
  color: #e36387;
  font-size: 2.2vmin;
`;
const SharedFcList = () => {
  const dispatch = useDispatch();
  const { sharedFcList } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchSharedFc());
  }, [dispatch]);
  return (
    <div>
      {/* card fadeinup 시도해보자 */}
      <Container>
        <Card
          variant="soft"
          sx={{
            width: '16.5vw',
            // boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 10%);' }}, 스투비플래너 카드 예시
            boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
            marginTop: '10vh',
            ':hover': { transform: 'scale(1.05)', cursor: 'pointer' },
            ':active': { transform: 'scale(0.95)' },
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
            <CardFooter>
              <Like />
              <span>좋아요횟수</span>
              <Comment />
              <span>댓글갯수</span>
            </CardFooter>
          </CardOverflow>
        </Card>
      </Container>
    </div>
  );
};

export default SharedFcList;
