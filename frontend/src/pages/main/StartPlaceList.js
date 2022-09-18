import React from 'react';
import styled from 'styled-components';
import './main.css';

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

  background-size: 15vw 5vh;
  font-size: 4vmin;
  font-family: Tmoney;
  color: #333333;
  text-align: start;
  padding: 0;
`;



const StartPlaceList = () => {
  return (
    <div>
      <Container>
        <Text>어디로 함 가보까?</Text>
      </Container>
    </div>
  );
};

export default StartPlaceList;