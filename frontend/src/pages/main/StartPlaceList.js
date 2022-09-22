import React from 'react';
import styled from 'styled-components';
import './main.css';

// 카드관련
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';

const Container = styled.div`
  animation: fadeInUp 2s;
  margin: 10vh;
  /* display: flex; */
  .ko {
    color: #333333;
  }
  .eng {
    color: #5b5b5b;
    font-size: 3vmin;
    margin-top: 0.5vh;
  }
`;

const Text = styled.div`
  animation: fadeInUp 2s;
  height: 4vh;
  width: 25vw;
  background: url('/img/baseline.png') center no-repeat;
  background-position-y: 0;
  background-position-x: 0;

  background-size: 15vw 5vh;
  font-size: 4vmin;
  font-family: Tmoney;
  color: #333333;
  text-align: start;
  padding: 0;
`;

const CardTitle = styled.div`
  font-family: Tmoney;
  font-size: 4vmin;
  color: #333333;
  margin-top: 2vh;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 5vh 0; //세로간격 가로간격
  justify-items: center;
`;

const StartPlaceList = () => {
  const startPlaceInfoList = [
    ['/img/startplace/Gwangali.jpg', '광안리', 'Gwangali'],
    ['/img/startplace/Haeundae.jpg', '해운대', 'Haeundae'],
    ['/img/startplace/Taejongdae.jpg', '태종대', 'Taejongdae'],
    ['/img/startplace/biff.jpg', '남포동', 'Nampodong'],
    ['/img/startplace/Yonggungsa.jpg', '용궁사', 'Yonggungsa'],
    ['/img/startplace/jagalchi.jpg', '자갈치 시장', 'Jagalchi Market'],
    ['/img/startplace/Gamcheon.jpg', '감천', 'Gamcheon'],
  ];

  return (
    <div>
      <Container>
        <Text>어디로 함 가보까?</Text>
        <GridBox>
          {startPlaceInfoList.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                border: '1px solid white',
                minHeight: '280px',
                width: '16.5vw',
                marginTop: '10vh',
                transition: 'transform 0.3s, border 0.3s',

                '&:hover': {
                  border: '1px solid #0AA1DD',
                  transform: 'translateY(-2px)',
                  cursor: 'pointer',
                },
              }}
            >
              <CardCover>
                <img src={item[0]} alt="" className="startPlaceImg" />
              </CardCover>

              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <CardTitle className="ko">{item[1]}</CardTitle>
                <CardTitle className="eng">{item[2]}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </GridBox>
      </Container>
    </div>
  );
};

export default StartPlaceList;
