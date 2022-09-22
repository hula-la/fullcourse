import React,{useState} from 'react';
import styled from 'styled-components';
import DateRanger from './DateRanger';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3vh;
  border: 1px solid;
`;



const PlanBar = () => {

  //여행 일수 계산
  const [tripDay, setTripDay] = useState(3);
  return (
    <Container>
      <DateRanger tripDay={tripDay} setTripDay={setTripDay} />
    </Container>
  );
};

export default PlanBar;
