import React from 'react';
import styled from 'styled-components';
import DateRanger from './DateRanger';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
`

const PlanBar = () => {
  return (
    <div>
      <Container>
        <DateRanger/>
        
      </Container>
    </div>
  );
};

export default PlanBar;