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

const PlanBar = () => {

  return (
    <Container>
      <DateRanger />
      <DailyPlanner/>
    </Container>
  );
};

export default PlanBar;
