import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/exports';


const PlannerContent = styled.div`
  
  border: 3px solid;
  overflow-y: scroll;
  height:70vh;

`
const PlaceBucket = styled.div`
  
`

const PlannerBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 20vw;
  height: 30vh;
  margin-bottom: 1vh;
  
`;


const Title = styled.div``

const Date = styled.p`
`

const PlannerList = styled.div`
  height: 20vh;
  border: 1px solid;
`

const SaveBtn = styled.button`
  
`

const DailyPlanner = ({ tripDay }) => {
  const { startDate, endDate, tripDates } = useSelector((state) => state.trip);

  

  useEffect(() => {}, []);

  return (
   
      <PlannerContent className='planner-content'>
        <PlaceBucket className='bucket'></PlaceBucket>
        {/* {startDate && <p>{format(startDate, 'MM/dd/yyyy')}</p> }  */}
        {tripDates &&
          tripDates.map((item, idx) => (
            <PlannerBox
              className="planner-box daily"
              id={item}>
              <Title className='title'>Day{idx+1}</Title>
              <Date className='date'>{item}</Date>
              <PlannerList className='planner-list'>안녕난 데일리 일정박스야</PlannerList>
            </PlannerBox>
          ))}

        <SaveBtn>일정생성</SaveBtn>
      </PlannerContent>
  );
};

export default DailyPlanner;
