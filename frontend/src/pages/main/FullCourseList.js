import React from 'react';
import styled from 'styled-components';
import './main.css';

// mui에서 미디어쿼리 사용하는 방법
import { makeStyles, useMediaQuery } from '@material-ui/core';

//Card 관련
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import Avatar from '@mui/joy/Avatar';

const useStyles = makeStyles((theme) => ({
  cardMobile: {
    // 테스트용 css
    width: '90%',
  },
}));

const Container = styled.div`
  animation: fadeInUp 2s;
  margin: 10vh;
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



const FullCourseList = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div>
      {/* card fadeinup 시도해보자 */}
      <Container>

        <Text>추천 풀코스</Text>
        <Card
          className={isMobile ? classes.cardMobile : null}
          variant="soft"
          sx={{
            width: 1 / 5,
            // boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 10%);' }}, 스투비플래너 카드 예시
            boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
            marginTop: '10vh'
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
                right: '8.7vw',
                bottom: 0,
                transform: 'translateY(50%)',
              }}
            >
              {/* <Favorite /> */}
            </Avatar>
          </CardOverflow>
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 2.5,
              px: 'var(--Card-padding)',
              borderTop: '1px solid',
              borderColor: 'neutral.outlinedBorder',
              bgcolor: 'background.level1',
            }}
          >
            <Typography
              level="body3"
              sx={{ fontWeight: 'md', color: 'text.secondary' }}
            >
              6.3k views
            </Typography>
            <Box sx={{ width: 2, bgcolor: 'divider' }} />
            <Typography
              level="body3"
              sx={{ fontWeight: 'md', color: 'text.secondary' }}
            >
              1 hour ago
            </Typography>
          </CardOverflow>
        </Card>
      </Container>
    </div>
  );
};

export default FullCourseList;
