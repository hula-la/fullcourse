import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { deletePlaceItem } from '../../../features/trip/tripSlice';

const PlannerContent = styled.div`
  border: 3px solid;
  overflow-y: scroll;
  height: 70vh;
`;
const PlaceBucket = styled.div`
  border: 1px solid;
  width: 20vw;
  height: 30vh;
`;

const DeleteBtn = styled.button``;

const PlannerBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 20vw;
  height: 30vh;
  margin-bottom: 1vh;
`;

const Title = styled.div``;

const Date = styled.p``;

const PlannerList = styled.div`
  height: 20vh;
  border: 1px solid;
`;

const SaveBtn = styled.button``;

const DailyPlanner = ({ tripDay }) => {
  const dispatch = useDispatch()
  const { startDate, endDate, tripDates, placeItem } = useSelector(
    (state) => state.trip,
  );

  useEffect(() => {}, []);

  const deletePlaceInBucket = (id, e) => {
    e.preventDefault()
    console.log("id가 일치하나",id)
    dispatch(deletePlaceItem(id))
    

  }
 
  return (
    <PlannerContent className="planner-content">
      <PlaceBucket className="planner-box bucket">
        안녕난 장소장바구니야
        {placeItem &&
          placeItem.map((item, idx) => (
            <li key={idx}>
              {item.placeName}
              <DeleteBtn
                onClick={(e)=> deletePlaceInBucket(idx,e)}
              >삭제</DeleteBtn>
            </li>
          ))}
      </PlaceBucket>

      {tripDates &&
        tripDates.map((item, idx) => (
          <PlannerBox key={idx} className="planner-box daily" id={item}>
            <Title className="title">Day{idx + 1}</Title>
            <Date className="date">{item}</Date>
            <PlannerList className="planner-list">
              안녕난 데일리 일정박스야
            </PlannerList>
          </PlannerBox>
        ))}

      <SaveBtn>일정생성</SaveBtn>
    </PlannerContent>
  );
};

export default DailyPlanner;
