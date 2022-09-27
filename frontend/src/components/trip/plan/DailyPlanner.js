import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { createTrip } from '../../../features/trip/tripActions';

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
  const dispatch = useDispatch();

  const { tripDates, placeItem, startDate, endDate, regDate, markers, map } =
    useSelector((state) => state.trip);

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
    //삭제기능 바닐라 자스로 추가
    plannerContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove();
      }
      //경로관련기능 바닐라 자스로 추가
      else if (e.target.closest('.planner-box')) {
        const placeLocations = getPlaceLocations(e);
        const mapElement = document.querySelector('#map')
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 35.1165, lng: 129.0401 },
          zoom: 11,
        })
        console.log("이거뭘반환해주는거지", placeLocations)
        if (placeLocations) {map.renderRoute(placeLocations)};
      }
    });
    const getPlaceLocations = (e) => {
      const titleElm = e.target.closest(".date"); //데일리 일정박스 바로 위에 있는 엘리먼트로 클래스 걸어주면될듯
      console.log("이건뭐지",titleElm.nextElementSibling)
      const itemElms = titleElm.nextElementSibling.children
        ? [...titleElm.nextElementSibling.children]
        : null;
      console.log("자식요소",itemElms)
      if (!itemElms || itemElms.length < 2) return null; //경로 두군데는 이상이어야함
      return itemElms.map((item) => item[item.dataset.placeId]={lat:item.dataset.placeLat, lng:item.dataset.placeLng});
    }

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

  //여행 일정 객체 생성 관련
  var newObj = {};
  var newTrip = {
    endDate: endDate,
    places: {},
    startDate: startDate,
    regDate: regDate,
    thumbnail: null,
  };

  const createTripObj = () => {
    const places = [...document.querySelectorAll('.daily')].forEach(
      (plannerBox, idx) => {
        newObj[`${idx}`] = [];
        newTrip.places = newObj;
      },
    );
  };

  //좋은 방식은 아닌거 같으니 리팩필요
  const subCreateTripObj = () => {
    const dailyItem = [...document.querySelectorAll('.daily')].map(
      (plannerBox) => {
        const placeInfo = [...plannerBox.querySelectorAll('.list-item')].map(
          (placeItem, idx) => {
            const comment = '임시메모';
            const courseOrder = idx;
            const placeData = placeItem.dataset;
            const img = placeData.placeImg;
            newTrip['thumbnail'] = img;
            const placeId = placeData.placeId;
            const type = 'ACTIVITY'; //임시타입
            const visited = false;
            return { comment, courseOrder, img, placeId, type, visited };
          },
        );
        return { placeInfo };
      },
    );
    return { trip: { dailyItem } };
  };

  const createNewTrip = () => {
    createTripObj();
    const tripObj = subCreateTripObj();
    var tmp = tripObj.trip.dailyItem;
    tmp.forEach((tmp, idx) => {
      newTrip.places[`${idx}`] = tmp['placeInfo'];
    });
    console.log('완성형', newTrip);
    console.log('얘가들어감', JSON.stringify(newTrip));
    dispatch(createTrip(JSON.stringify(newTrip)));
  };

  const removeMarker = (lat, lng, e) => {
    markers &&
      markers.forEach((item, idx) => {
        if (item.position.lat === lat && item.position.lng === lng) {
          console.log('item', item);
          item.setMap(null);
        }
      });
  };

  //루트렌더
  const renderRoute = (placeLocations) => {
    removeRoute();
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    //경유지추가
    const stopovers = placeLocations
      .slice(1, placeLocations.length - 1)
      .map((item, idx) => {
        return { stopver: true, location: { lat: item.lat, lng: item.lng } };
      });

    console.log('경유지잘담기나', stopovers);
  };

  //기존루트 삭제
  const removeRoute = () => {};

  return (
    <PlannerContent className="planner-content">
      <PlaceBucket className="planner-box bucket">
        안녕난 장소장바구니야
        {placeItem &&
          placeItem.map((item, idx) => (
            <li
              key={idx}
              draggable={item.draggable}
              data-place-id={item.placeId}
              data-place-img={item.imgUrl}
              data-place-lat={item.lat}
              data-place-lng={item.lng}
              className="list-item"
            >
              {item.name}
              <DeleteBtn
                className="delete"
                onClick={(e) => {
                  removeMarker(item.lat, item.lng, e);
                }}
              >
                삭제
              </DeleteBtn>
            </li>
          ))}
      </PlaceBucket>

      {tripDates &&
        tripDates.map((item, idx) => (
          <PlannerBox key={idx} className="planner-box daily" id={item}>
            <Title className="title" onClick={renderRoute}>Day{idx + 1}</Title>
            <Date className="date">{item}</Date>
            <PlannerList className="planner-list">
              안녕난 데일리 일정박스야
            </PlannerList>
          </PlannerBox>
        ))}

      <SaveBtn onClick={createNewTrip}>일정생성</SaveBtn>
    </PlannerContent>
  );
};

export default DailyPlanner;
