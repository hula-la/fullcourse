import React from "react";
import styled from "styled-components";
// import { useEffect } from "react";

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
  width: 30vw;
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
  background-color: #A4D8FF;
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
    font-size: 1.2rem;
    color: #4e4e4e;
    /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 3px 2px rgba(0, 0, 0, 0.2); 괜찮은듯 부담스러움*/
  }
`;

const MainPage = () => {
  return (
    <Introduce>
      <VideoContainer>
        {/* 비디오파일 여러개 받아서 랜덤으로 재생해야 할 듯_ 유료라서 ㅜㅜ */}
        {/* 비디오 파일 위치는 public에 있어야 재생가능 */}
        <video autoPlay loop muted id="video">
          <source src="video/main_video1.mp4" type="video/mp4" />
        </video>
      </VideoContainer>
      <MainTitle>
        {/* public 경로 사용하는 법 */}
        <Logo src="/img/logo2.png" alt="logo2_img" />
        <Text>부산, 풀코스로 모시겠습니다.</Text>
        <StartBtn>시작하기</StartBtn>
      </MainTitle>
    </Introduce>
  );
};

export default MainPage;
