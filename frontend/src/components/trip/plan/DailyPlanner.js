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

  var newObj = {}
  var obj = {}
  var trip = {
    "endDate" : null,
    "startDate": null,
    "places":{},
    "thumbnail": null,
  }
  var newtrip = {
    "endDate" : null,
    "startDate": null,
    "places":{},
    "thumbnail": null,
  }
  const createTripObj = () => {
    const places = [...document.querySelectorAll('.daily')].forEach(
      (plannerBox, idx) => {
        // var dateStr = plannerBox.querySelector(".date").innerText
        newObj[`${idx}`] = []
        newtrip.places = newObj
        console.log("이거뭘까", newObj)
        console.log("끝이보인다",newtrip)
        
        const eachDay = [...plannerBox.querySelectorAll('.list-item')].forEach(
          (placeItem, id) => {
          console.log("여기 뭐담기냐", placeItem)
          console.log("index가 왜 같지",id)
          // console.log("placeId",placeItem.dataset.placeId )
          // obj['placeId'] = placeItem.dataset.placeId
          // console.log("제발나그만하고싶어",trip.places[`${id}`])
          // trip.places[`${id}`].push(obj)
          // console.log("제발나그만하고싶어",trip)

        },
        );
      },
    );
  }
  
 

  // const createTripObj = () => {
  //   const place = [...document.querySelectorAll(".daily")]
  //   console.log("이거뭐지",place)
  //   console.log(typeof(place))
  //   const places = [...document.querySelectorAll(".daily")].forEach(
  //     (plannerBox,idx) => {
  //       console.log("얘는뭐지",plannerBox)

  //       // newObj['idx'] = newnewObj
  //       console.log(typeof(newObj))
  //       console.log()
  //       const Day = [...plannerBox.querySelectorAll(".list-item")].forEach((placeItem,idx) =>
  //       {console.log("너는뭐냐구",placeItem)
  //         var newnewObj = {}
  //         newnewObj[`placeId${idx}`] = placeItem.dataset.placeId
  //         console.log("얘 만들어짐?",newnewObj)
  //         var newObj = {}
  //         newObj[`places${idx}`] = newnewObj
  //         console.log("얘뭐지",newObj)
  //         return newnewObj
  //       }
       
  //       )
        
  //     })
     



  //   //     console.log("야 너 뭐야",Day)
  //   //     const eachDay = [
  //   //       ...plannerBox.querySelectorAll(".list-item"),
  //   //     ].map((placeItem,idx) => {
  //   //       // console.log(idx)
  //   //       console.log(placeItem)
  //   //       const placeId = placeItem.dataset.placeId
  //   //       const courseOrder = idx
  //   //       const DayInfo = idx+1
  //   //       return { placeId, courseOrder, DayInfo};
  //   //     });
  
  //   //     return { eachDay };
  //   //   }
  //   // )
  //   const regDate = '2022-09-26'
  //   return {
  //     trip: { endDate, places, regDate, startDate }
  //   }
  // }
  const createObj = () => {
    const dailyItem = [...document.querySelectorAll(".daily")].map(
      (plannerBox) => {
        console.log("살려줘",plannerBox)
        const places_attributes = [
          ...plannerBox.querySelectorAll(".list-item"),
        ].map((placeItem) => {
          const placeId = placeItem.dataset.placeId;
          return { placeId };
        });
  
        return {  places_attributes };
      }

    )
    return { trip : {dailyItem} }
  }

  const newTrip= () => {
    createTripObj()
    const tripObj = createObj()
    console.log("여기에 뭐들어가있음",tripObj)
    console.log("자해보자",tripObj.trip.dailyItem[0]) //여기에 순서별 daylist가 배열이 들어있음
    console.log("여기다넣어보자",newtrip)
    var awslist = tripObj.trip.dailyItem
    awslist.forEach((awslist,idx)=>{
      console.log("이건뭘까",awslist)
      newtrip.places[`${idx}`] = awslist['places_attributes']
    })
    console.log("제발나좀살려줘",newtrip)
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
