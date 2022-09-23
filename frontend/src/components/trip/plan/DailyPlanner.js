import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/exports';
import format from 'date-fns/format';

const PlannerContent = styled.div`
  border: 3px solid;
  overflow-y: scroll;
  height:70vh;

`

const PlannerBox = styled.div`
  border: 1px solid;
  width: 20vw;
  height: 10vh;
`;


const Title = styled.div``

const Date = styled.p`
`

const PlannerList = styled.div`
  height: 10vw;
  border: 1px solid;
`

const DailyPlanner = ({ tripDay }) => {
  const { startDate, endDate, tripDates } = useSelector((state) => state.trip);

  const planData = [];

  useEffect(() => {}, []);

  return (
   
      <PlannerContent className='planner-content'>
        {/* {startDate && <p>{format(startDate, 'MM/dd/yyyy')}</p> }  */}
        {tripDates &&
          tripDates.map((item, idx) => (
            <PlannerBox
              className="planner-box daily"
              id={item}>
              <Title className='title'>Day{idx+1}</Title>
              <Date className='date'>{item}</Date>
              <PlannerList className='planner-list'></PlannerList>
            </PlannerBox>
          ))}
      </PlannerContent>
   
  );
};

export default DailyPlanner;
