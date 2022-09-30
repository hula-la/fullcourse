import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import KeyboardDoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import './main.css';

import FullCourseList from './FullCourseList';
import StartPlaceList from './StartPlaceList';

const Container = styled.div`
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 1fr 0.5fr 2fr; //가로로 구분
  background: radial-gradient(
    ellipse at center,
    #fffeea 0%,
    #fffeea 35%,
    #b7e8eb 100%
  );
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    overflow-x: hidden;
    /* overflow: overlay; */
    display: grid;
    grid-template-rows: 0.2fr 0.2fr 2fr; //가로로 구분
    background: radial-gradient(
      ellipse at center,
      #fffeea 0%,
      #fffeea 35%,
      #b7e8eb 100%
    );
  }
`;

const Introduce = styled.div`
  align-items: center;
  @media only screen and (min-device-width: 479px) {
    display: flex;
  }

  background-color: #fff3f8;
`;

const VideoContainer = styled.div`
  overflow: hidden; //넘치는 부분 스크롤바 없애기
  width: 70vw;
  height: 100vh;
  //스마트폰 미디어 쿼리
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    position: relative;
    width: 100vw;
  }
  video {
    height: 100%;
    @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
      filter: brightness(80%);
    }
  }
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 전체를 감싼 div에 크기를 부여해주어야 위아래로 같이 안움직이고 아이콘만 위아래로 움직임 */
  width: 30vw;
  height: 50vh;

  margin: auto;

  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 230px;
    width: 230px;
    background-color: white;
    border-radius: 80vw;
    padding: 10vw;
  }
`;

const Logo = styled.img`
  width: 80%;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    width: 113%;
    margin-top: 3vh;
  }
`;

const Text = styled.div`
  font-family: Tmoney;
  color: #333333;
  margin-top: 1vh;
  font-size: 1.1rem;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    font-size: 1.1rem;
  }
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
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    color: #fff;
    width: 35vw;
    &:hover {
      background-color: #8fbcde;
      width: 35vw;
      color: #4e4e4e;
      /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 3px 2px rgba(0, 0, 0, 0.2); 괜찮은듯 부담스러움*/
    }
  }
`;

const PreviewBox = styled.div`
  cursor: pointer;
  height: 10px;
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

const FullCourses = styled.div`
  margin: 0 7vw;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 0;
    width: 100vw;
  }
`;
const StartPlaces = styled.div`
  margin: 0 7vw;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 0;
    width: 100vw;
  }
`;

const Ocean = styled.div`
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    height: 2%;
    width: 100%;
    position: absolute;
    top: 465vh;
  }
`;

const Wave = styled.div`
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    height: 10%;
    width: 100%;
    position: absolute;
    top: 455vh;
  }
`;

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
        {/* <div className="wrapper"></div> */}
        <MainTitle ref={section1}>
          {/* public 경로 사용하는 법 */}
          <Logo src="/img/logo2.png" alt="logo2_img" />
          <Text>부산, 풀코스로 모시겠습니다.</Text>
          <Link to={'/user/login'}>
            <StartBtn>시작하기</StartBtn>
          </Link>

          <a
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
        <FullCourseList />
      </FullCourses>
      <StartPlaces>
        <StartPlaceList />
        <Wave className="wave wave1"></Wave>
        <Wave className="wave wave2"></Wave>
        <Wave className="wave wave3"></Wave>
        <Wave className="wave wave4"></Wave>
        <Ocean className="ocean"></Ocean>
      </StartPlaces>
    </Container>
  );
};

export default MainPage;
