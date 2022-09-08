import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import KeyboardDoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import './main.css';

import FullCourseList from './FullCourseList';

const Container = styled.div`
  overflow: overlay;
  display: grid;
  grid-template-rows: 1fr 1fr 2fr; //가로로 구분
`;

const Introduce = styled.div`
  display: flex;
  align-items: center;
`;

const VideoContainer = styled.div`
  overflow: hidden; //넘치는 부분 스크롤바 없애기
  width: 70vw;
  //스마트폰 미디어 쿼리
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    width: 100vw;
  }
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 전체를 감싼 div에 크기를 부여해주어야 위아래로 같이 안움직이고 아이콘만 위아래로 움직임 */
  width: 30vw;
  height: 50vh;
`;

const Logo = styled.img`
  width: 80%;
`;

const Text = styled.div`
  font-family: Tmoney;
  color: #333333;
  margin-top: 1vh;
  font-size: 1.2rem;
`;

const StartBtn = styled.button`
  background-color: #a4d8ff;
  border: 0;
  width: 15vw;
  height: 5vh;
  border-radius: 0.5rem;
  margin-top: 3vh;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.1);
  font-family: Tmoney;
  font-size: 1.1rem;
  color: #595959;
  cursor: pointer;

  &:hover {
    background-color: #8fbcde;
    width: 15.2vw;
    height: 5.2vh;
    font-size: 1.15rem;
    color: #4e4e4e;
    /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 3px 2px rgba(0, 0, 0, 0.2); 괜찮은듯 부담스러움*/
  }
`;

const PreviewBox = styled.div`
  cursor: pointer;
  &:hover .previewTip {
    visibility: visible;
  }
`;

const DropDownIcon = styled(KeyboardDoubleArrowDown)`
  color: #595959;
  padding-top: 1.4vh;
  /* 아래에서 motion은 main.css 에서 import 해오는 동작임 - 리액트에서 css animation을 쓸때는 @keyframes를 활용해야함  */
  animation: motion 0.7s linear 0s infinite alternate;
`;

const PreviewTip = styled.p`
  visibility: hidden;
  background-color: #484848;
  color: white;
  text-align: center;
  margin-top: 0;
  border-radius: 0.3rem;
  padding: 0.3rem 0.6rem;
  font-family: Tmoney;
  font-size: 0.8rem;
  opacity: 80%;
  z-index: 1;
`;

const FullCourses = styled.div``;

const MainPage = () => {
  const section1 = useRef(null);
  const section2 = useRef(null);

  return (
    <Container>
      <Introduce id="introduce">
        <VideoContainer>
          {/* 비디오파일 여러개 받아서 랜덤으로 재생해야 할 듯_ 유료라서 ㅜㅜ */}
          {/* 비디오 파일 위치는 public에 있어야 재생가능 */}
          <video autoPlay loop muted id="video">
            <source src="video/main_video1.mp4" type="video/mp4" />
          </video>
        </VideoContainer>
        <div className="wrapper"></div>
        <MainTitle ref={section1}>
          {/* public 경로 사용하는 법 */}
          <Logo src="/img/logo2.png" alt="logo2_img" />
          <Text>부산, 풀코스로 모시겠습니다.</Text>
          <Link to={'/user/login'}>
            <StartBtn>시작하기</StartBtn>
          </Link>

          <a
            href
            onClick={(e) => {
              e.preventDefault(e);
              section2.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <PreviewBox>
              <DropDownIcon />
              <PreviewTip className="previewTip">둘러보기</PreviewTip>
            </PreviewBox>
            {/* 둘러보기는 툴팁으로 넣자 */}
          </a>
        </MainTitle>
      </Introduce>
      <FullCourses ref={section2}>
        <FullCourseList/>
      </FullCourses>
    </Container>
  );
};

export default MainPage;
