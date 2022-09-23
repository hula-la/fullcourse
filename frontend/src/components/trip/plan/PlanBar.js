import React,{useState} from 'react';
import styled from 'styled-components';
import DateRanger from './DateRanger';
import DailyPlanner from './DailyPlanner';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3vh;
  border: 1px solid;
  height: 83vh;

  
`;



const PlanBar = () => {


  //여행 일수 계산
  const [tripDay, setTripDay] = useState(3);
  return (
    <Container>
      <DateRanger tripDay={tripDay} setTripDay={setTripDay} />
      <DailyPlanner tripDay={tripDay}  />
    </Container>
  );
};

export default PlanBar;
