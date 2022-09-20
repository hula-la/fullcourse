import React from 'react';
import styled from 'styled-components';
import DateBox from './DateBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const PlanBar = () => {
  return (
    <div>
      <Container>
        <DateBox/>
        
      </Container>
    </div>
  );
};

export default PlanBar;