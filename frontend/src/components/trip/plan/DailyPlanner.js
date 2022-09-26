import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import format from 'date-fns/format';
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

const DailyPlanner = () => {
  const { tripDates, placeItem, startDate, endDate } = useSelector((state) => state.trip);

  useEffect(() => {
    //드래그앤 드롭 바닐라 자스
    const plannerContent = document.querySelector('.planner-content');
    plannerContent.addEventListener('dragstart', (e) => {
      if (e.target.closest('.list-item')) {
        e.target.closest('.list-item').classList.add('dragging');
      }
    });
    plannerContent.addEventListener('dragend', (e) => {
      if (e.target.closest('.list-item')) {
        e.target.closest('.list-item').classList.remove('dragging');
      }
    });
    plannerContent.addEventListener('dragover', (e) => {
      if (e.target.closest('.planner-list')) {
        sortAndDisplayItem(e);
      }
    });
    plannerContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove();
      }
    });
    const sortAndDisplayItem = (e) => {
      const container = e.target.closest('.planner-list');
      const item = document.querySelector('.dragging');
      const afterElement = getDragAfterElement(container, e.clientY);
      if (afterElement) {
        container.insertBefore(item, afterElement);
      } else {
        container.appendChild(item);
      }
      e.preventDefault();
    };
    const getDragAfterElement = (container, y) => {
      const draggableElms = [
        ...container.querySelectorAll('.list-item:not(.dragging)'),
      ];
      return draggableElms.reduce(
        (closest, child) => {
          const rect = child.getBoundingClientRect();
          const offset = y - rect.top - rect.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY },
      ).element;
    };
  }, []);

  const createTripObj = () => {
    const places = [...document.querySelectorAll(".daily")].map(
      (plannerBox,idx) => {
        const dateStr = plannerBox.querySelector(".date").innerText;
        console.log(dateStr)
      
        console.log(idx)
        const additionalProp = [
          ...plannerBox.querySelectorAll(".list-item"),
        ].map((placeItem,idx) => {
          // console.log(idx)
          console.log(placeItem)
          const placeId = placeItem.dataset.placeId
          const courseOrder = idx
          return { placeId, courseOrder };
        });
  
        return { additionalProp };
      }
    );


    

    const regDate = '2022-09-26'
    return {
      trip: { endDate, places, regDate, startDate }
    }
    
  }

  const newTrip= () => {
    const tripObj = createTripObj()
    console.log(tripObj)
  }

  return (
    <PlannerContent className="planner-content">
      <PlaceBucket className="planner-box bucket">
        안녕난 장소장바구니야
        {placeItem &&
          placeItem.map((item, idx) => (
            <li key={idx} draggable={item.draggable} data-place-id={item.placeId} className="list-item">
              {item.placeName}
              <DeleteBtn className="delete">삭제</DeleteBtn>
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

      <SaveBtn onClick={newTrip}>일정생성</SaveBtn>
    </PlannerContent>
  );
};

export default DailyPlanner;
