import React from 'react';
import styled from 'styled-components';
import './main.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// 카드관련
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';

//액션 임포트
import { fetchPlaceDetail } from '../../features/trip/tripActions';
import { setPlaceItem } from '../../features/trip/tripSlice';

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
  const dispatch = useDispatch();
  const startPlaceInfoList = [
    ['/img/startplace/Gwangali.jpg', '광안리', 'Gwangali', 73],
    ['/img/startplace/Haeundae.jpg', '해운대', 'Haeundae', 72],
    ['/img/startplace/Taejongdae.jpg', '태종대', 'Taejongdae', 4],
    ['/img/startplace/biff.jpg', '남포동', 'Nampodong', 174],
    ['/img/startplace/Yonggungsa.jpg', '용궁사', 'Yonggungsa'],
    ['/img/startplace/jagalchi.jpg', '자갈치 시장', 'Jagalchi Market'],
    ['/img/startplace/Gamcheon.jpg', '감천', 'Gamcheon'],
  ];

  const navigate = useNavigate();

  const setStartPlaceInfo = (id, e) => {
    const placeId = id;
    const placeType = 'travel';
    console.log('placeId', placeId);
    dispatch(fetchPlaceDetail({ placeId, placeType }))
      .unwrap()
      .then((res) => {
        console.log('되나', res.data);
        let placeItemObj = new Object();
        const data = res.data;
        placeItemObj.placeId = placeId;
        placeItemObj.name = data.name;
        placeItemObj.imgUrl = data.imgUrl;
        placeItemObj.draggable = true;
        placeItemObj.lat = data.lat;
        placeItemObj.lng = data.lng;
        dispatch(setPlaceItem(placeItemObj));
      })
      .then(() => {
        navigate('trip/plan');
      });
  };
  //   {
  //     "placeId": 1,
  //     "name": "흰여울문화마을",
  //     "lat": 35.0788,
  //     "lng": 129.044,
  //     "imgUrl": "https://www.visitbusan.net/uploadImgs/files/cntnts/20191222164810529_ttiel",
  //     "reviewCnt": 0,
  //     "likeCnt": 0
  // }

  // let placeItemObj = new Object();
  // placeItemObj.placeId = placeId;
  // placeItemObj.name = placeName;
  // placeItemObj.imgUrl = placeImg;
  // placeItemObj.draggable = true;
  // placeItemObj.lat = placeLat;
  // placeItemObj.lng = placeLng;
  // placeItemObj.id = id;

  // dispatch(setPlaceItem(placeItemObj));

  return (
    <div>
      <Container>
        <Text>어디로 함 가보까?</Text>
        <GridBox>
          {startPlaceInfoList.map((item, idx) => (
            <Card
              onClick={(e) => {
                setStartPlaceInfo(item[3], e);
              }}
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
