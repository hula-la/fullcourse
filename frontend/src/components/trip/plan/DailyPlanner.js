import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../../../features/trip/tripActions';
import Swal from 'sweetalert2';
import {
  clearMarkers,
  deleteMarkers,
  deleteAllPlace,
} from '../../../features/trip/tripSlice';

import './trip.css';
import { TiDeleteOutline } from 'react-icons/ti';
import { GrPowerReset } from 'react-icons/gr';
import format from 'date-fns/format';
import { setDates } from '../../../features/trip/tripSlice';

const PlannerContent = styled.div`
  background-color: #e8f9fd;
  margin-top: 1vh;
  /* padding: 1vh; */
  overflow-y: scroll;
  height: 70vh;
  border-radius: 0 0 1rem 1rem;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #a4d8ff;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #e8f9fd;
    border-radius: 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  .sticky {
    position:sticky;
    top:0px;

  }
`;
const PlaceBucket = styled.div`
  margin-top: 2vh;
  width: 20vw;
  height: 60vh;
  border: 1.5px solid #a4d8ff;
  background-color: #ffffff;
  .bucketBox {
    min-height: 5vh;
  }
  .deleteIcon path {
    stroke: #0aa1dd;
    &:hover {

    stroke: #06739e;

  }

  }

`;

const DeleteBtn = styled(TiDeleteOutline)`
  font-size: 2.5vmin;
  color: #eb1d36;
  cursor: pointer;
  &:hover {
    color: #bb172a;
    
  }
`;

const ResetBtn = styled(GrPowerReset)`
  font-size: 3vmin;
  margin-left: 1vw;
  cursor: pointer;
`;

const PlannerBox = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid; */
  width: 20vw;
  height: auto;
  margin-bottom: 1vh;
`;

const MainTitle = styled.div`
  background: #dadada;
  height: 5vh;
  border-radius: 2px;
  /* border-radius: 0.5rem 0.5rem 0 0; */
  line-height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  background: #dadada;
  height: 5vh;
`;
const Date = styled.div`
  margin-right: 1vw;
`;

const PlannerList = styled.div`
  min-height: 20vh;
`;

const SaveBtn = styled.button`
  background-color: #a4d8ff;
  border: 0;
  width: 5vw;
  height: 6vh;
  padding: 0.7vh;
  margin-top: 1vh;
  margin-bottom: 1.5vh;
  border-radius: 0.3rem;
  font-family: Tmoney;
  font-size: 1.8vmin;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #8fbcde;
    color: #4e4e4e;
  }
`;

const DailyPlanner = ({ map, setMap, mapRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placeLocations, setPlaceLocations] = useState(null);
  const [planDay, setPlanDay] = useState(1);

  const { tripDates, placeItem, startDate, endDate, regDate, markers } =
    useSelector((state) => state.trip);

  const googleMapStyle = {
    mapStyles: [
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
  };

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
        //데일리 일정에 담긴 장소정보 추가
        const placeLocations = getPlaceLocations(e);
        setPlaceLocations(placeLocations);
        const selectedBox = e.target.closest('.planner-box');
        removeAllClickedStyle();
        addClickedStyle(selectedBox.querySelector('.triptitle'));
      }
    });

    const addClickedStyle = (elm) => elm.classList.add('clicked');

    const removeClickedStyle = (elm) => elm.classList.remove('clicked');

    const removeAllClickedStyle = () => {
      Array.from(document.querySelectorAll('.triptitle')).forEach((triptitle) =>
        removeClickedStyle(triptitle),
      );
    };
    const getPlaceLocations = (e) => {
      const DayElm = e.target.closest('.planner-box');
      const item = DayElm.querySelector('.triptitle');
      setPlanDay(item.dataset.planDay);
      const titleElm = e.target.closest('.triptitle'); //데일리 일정박스 바로 위에 있는 엘리먼트로 클래스 걸어주면될듯
      const itemElms = titleElm.nextElementSibling.children
        ? [...titleElm.nextElementSibling.children]
        : null;
      if (!itemElms || itemElms.length < 2) return null; //경로 두군데는 이상이어야함
      return itemElms.map(
        (item) =>
          (item[item.dataset.placeId] = {
            lat: item.dataset.placeLat,
            lng: item.dataset.placeLng,
          }),
      );
    };

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
  }, [placeItem]);

  const getDates = (startDate, endDate) => {
    const dateRange = [];
    while (startDate <= endDate) {
      const date = format(new window.Date(startDate), 'yyyy-MM-dd');
      dateRange.push(date);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateRange;
  };
  useEffect(() => {
    var sD = new window.Date();
    var eD = new window.Date();
    eD.setDate(sD.getDate() + 2);
    const dayRange = getDates(sD, eD);
    dispatch(setDates(dayRange));
  }, []);

  //여행 일정 객체 생성 관련1
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

  //여행 일정 객체 생성 관련2 좋은 방식은 아닌거 같으니 리팩필요
  const subCreateTripObj = () => {
    const dailyItem = [...document.querySelectorAll('.daily')].map(
      (plannerBox) => {
        const placeInfo = [...plannerBox.querySelectorAll('.list-item')].map(
          (placeItem, idx) => {
            const comment = null;
            const courseOrder = idx;
            const placeData = placeItem.dataset;
            const img = null;
            newTrip['thumbnail'] = placeData.placeImg;
            const placeId = placeData.placeId;
            const type = placeData.placeType;
            const visited = false;
            return { comment, courseOrder, img, placeId, type, visited };
          },
        );
        return { placeInfo };
      },
    );
    return { trip: { dailyItem } };
  };

  //여행일정생성
  const createNewTrip = () => {
    createTripObj();
    const tripObj = subCreateTripObj();
    var tmp = tripObj.trip.dailyItem;
    tmp.forEach((tmp, idx) => {
      newTrip.places[`${idx}`] = tmp['placeInfo'];
    });
    dispatch(createTrip(JSON.stringify(newTrip)))
      .unwrap()
      .then((res) => {
        Swal.fire({
          imageUrl: '/img/booggie.png',
          imageHeight: 300,
          imageAlt: 'A tall image',
          title: '풀코스 생성 완료!',
          text: '부기와 함께 떠나볼까요?',
          height: 500,
        });
        navigate(`/user/fullcourse/${res.data}`);
        deleteAll();
        clearMarker();
      });
  };

  // 마커삭제
  const removeMarker = (lat, lng, e) => {
    markers &&
      markers.forEach((item, idx) => {
        const copyArray = [...markers];
        if (item.position.lat === lat && item.position.lng === lng) {
          copyArray.splice(idx, 1);
          dispatch(deleteMarkers(copyArray));
        }
      });
  };

  const clearMarker = () => {
    dispatch(clearMarkers());
  };

  const drawPolyline = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.1944, lng: 129.1194 },
      zoom: 11,
      styles: googleMapStyle.mapStyles,
    });

    const waypoints = [];

    placeLocations &&
      placeLocations.map((item, idx) => {
        waypoints.push({
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        });
      });

    const color = ['#FF5854', '#66FF5C', '#FFBC65', '#655AFF', '#E574FF'];
    var myColor = '';
    var myIcon = new window.google.maps.MarkerImage(
      '/img/marker/marker0.png',
      null,
      null,
      null,
      new window.google.maps.Size(28, 30),
    );
    for (var i = 1; i < 6; i++) {
      if (parseInt(planDay) === i) {
        myIcon = new window.google.maps.MarkerImage(
          `/img/marker/marker${i - 1}.png`,
          null,
          null,
          null,
          new window.google.maps.Size(28, 30),
        );
        myColor = color[i - 1];
      }
    }

    waypoints &&
      waypoints.map((item, idx) => {
        new window.google.maps.Marker({
          map,
          position: item,
          icon: myIcon,
          label: {
            text: `${idx + 1}`,
            fontSize: '1.5vmin',
            fontFamily: 'Tmoney',
            className: 'numlabel',
            color: 'white',
          },
        });
      });

    const flightPath = new window.google.maps.Polyline({
      path: waypoints,
      geodesic: true,
      strokeColor: myColor,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(map);
  };
  //진짜 장소리스트 지우기
  const deleteAll = () => {
    dispatch(deleteAllPlace());
  };
  const clearPlaceItems = () => {
    document
      .querySelectorAll('.list-item')
      .forEach((placeItem) => placeItem.remove());
    clearMarker();
  };
  return (
    <PlannerContent className="planner-content">
      <PlaceBucket className="planner-box bucket sticky">
        <MainTitle>
          장소를 추가해보세요
          <ResetBtn onClick={clearPlaceItems} className="deleteIcon" />
        </MainTitle>
        <div className="bucketBox">
          {placeItem &&
            placeItem.map((item, idx) => (
              <li
                key={idx}
                draggable={item.draggable}
                data-place-id={item.placeId}
                data-place-img={item.imgUrl}
                data-place-lat={item.lat}
                data-place-lng={item.lng}
                data-place-type={item.type}
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
        </div>
      </PlaceBucket>
      {tripDates &&
        tripDates.map((item, idx) => (
          <PlannerBox key={idx} className="planner-box daily" id={item}>
            <Title
              className="triptitle"
              data-plan-day={idx + 1}
              onClick={drawPolyline}
            >
              Day{idx + 1} <Date>{item}</Date>{' '}
            </Title>

            <PlannerList className="planner-list"></PlannerList>
          </PlannerBox>
        ))}

      <SaveBtn onClick={createNewTrip}>일정생성</SaveBtn>
    </PlannerContent>
  );
};

export default DailyPlanner;
