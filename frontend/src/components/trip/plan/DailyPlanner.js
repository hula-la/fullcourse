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

  useEffect(() => {
    const plannerContent = document.querySelector(".planner-content")
    plannerContent.addEventListener('dragstart', e => {
      console.log("여기뭐찎힘?",e.target)
      if(e.target.closest('.list-item')) {
        e.target.closest('.list-item').classList.add('dragging');
        console.log("여긴뭐찍힘")
      }
    })
    plannerContent.addEventListener('dragend', e => {
      console.log("여기뭐찎힘?",e.target)
      if(e.target.closest('.list-item')) {
        e.target.closest('.list-item').classList.remove('dragging');
        console.log("여기는뭐생기는데")
      }
    })
    plannerContent.addEventListener('dragover', e => {
      if(e.target.closest('.planner-list')) {
        console.log("이제여기는뭐생김",e)
        sortAndDisplayItem(e);
      }
    })
    plannerContent.addEventListener("click", (e) => {
      // on place items
      if (e.target.classList.contains("delete")) {
        e.target.parentNode.remove();
      }
    })
    const sortAndDisplayItem = (e) => {
      const container = e.target.closest('.planner-list');
      const item = document.querySelector('.dragging');
      const afterElement = getDragAfterElement(container, e.clientY);
      if(afterElement) {
        container.insertBefore(item, afterElement);
      } else {
        container.appendChild(item);
      }
      e.preventDefault();
    }
    const getDragAfterElement = (container, y) => {
      const draggableElms = [...container.querySelectorAll('.list-item:not(.dragging)')];
      return draggableElms.reduce((closest, child) => {
        const rect = child.getBoundingClientRect();
        const offset = y - rect.top - rect.height / 2;
        if(offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }


  }, []);

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
            <li
              key={idx}
              draggable={item.draggable}
              className='list-item'
            >
              {item.placeName}
              <DeleteBtn
                // onClick={(e)=> deletePlaceInBucket(idx,e)}
                className='delete'
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
