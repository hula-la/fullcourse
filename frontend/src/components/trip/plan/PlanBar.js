import React from 'react';
import styled from 'styled-components';
import DateRanger from './DateRanger';
import DailyPlanner from './DailyPlanner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1vh; */
  margin-top: 1vh;
  border-radius: 1rem;
  border: 3px dashed #A5F1E9;
  height: 86.5vh; 
  margin-left:1vh;
  margin-right: 1vh;

  color: #333333;
  
  /* margin: 3vh auto; */
  
  /* background: url('/img/note.png') center no-repeat;
  background-size: 25vw 70vh */

  
`;

const PlanBar = ({map, setMap, mapRef}) => {

  return (
    <Container>
      <DateRanger />
      <DailyPlanner map={map} setMap={setMap} mapRef={mapRef}/>
    </Container>
  );
};

export default PlanBar;
