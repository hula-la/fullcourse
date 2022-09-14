import React from 'react';
import styled from 'styled-components';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 25%;
  height: 100%;
  margin-top: 3rem;
  margin-left: 2rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

  #userInfo {
    display: flex;
    flex-direction: row;
    /* margin-bottom: 1rem; */
    font-weight: 600;
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #buttonWrapper {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
`;

const StyledButton = styled.div`
  background-color: none;
  text-align: start;
  cursor: pointer;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const SideBar = () => {
  return (
    <Side>
      <div id="userInfo">
        <div id="imgBlock">
          <img src="/img/default.jpeg" alt="profileImg" />
        </div>
        <p>nickname</p>
      </div>
      <div id="buttonWrapper">
        <StyledButton>나의 풀코스</StyledButton>
        <StyledButton>회원정보 수정</StyledButton>
        <StyledButton>회원 탈퇴</StyledButton>
      </div>
    </Side>
  );
};

export default SideBar;
