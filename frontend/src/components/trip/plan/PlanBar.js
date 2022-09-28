import React from 'react';
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

const PlanBar = ({map, setMap, mapRef}) => {

  return (
    <Container>
      <DateRanger />
      <DailyPlanner map={map} setMap={setMap} mapRef={mapRef}/>
    </Container>
  );
};

export default PlanBar;
