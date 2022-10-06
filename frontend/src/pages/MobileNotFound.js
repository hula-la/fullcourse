import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  text-align: center;
  padding: 0.8rem;
  background: #dceeff;
  img {
    width: 80%;
  }
  h1 {
    margin: 2rem;
  }
  button {
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
    border: 3px solid #2778c4;
    margin-top: 1rem;

    background: white;

    &:hover {
      background: #add8e64d;
    }
  }
`;

const MobileNotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>이 코스로는 모실 수 없어요~</h1>
      <img src="/img/booggie.png" />
      <div>
        찾으려는 페이지의 주소가 잘못 입력되었거나, <br />
        주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
        <br />
        입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
      </div>
      <button onClick={() => navigate('/')}>메인 페이지로</button>
    </Wrapper>
  );
};

export default MobileNotFound;
