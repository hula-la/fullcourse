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

const PlannerContent = styled.div`
  background-color: #e8f9fd;
  margin-top: 1vh;
  padding: 1vh;
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
`;
const PlaceBucket = styled.div`
  margin-top: 1vh;
  width: 20vw;
  height: 60vh;
  background-color: #ffffff;
  .bucketBox {
    min-height: 5vh;
  }
  .deleteIcon path {
    stroke: #0aa1dd;
  }
`;

const DeleteBtn = styled(TiDeleteOutline)`
  font-size: 2.5vmin;
  color: #eb1d36;
  cursor: pointer;
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
  margin-bottom: 1vh;
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
    init();
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

  //하나씩 삭제시키는거 넣어서 아마 없어도 될것 같은데 코드는 남겨놓음, 장소전체삭제
  const clearMarker = () => {
    dispatch(clearMarkers());
  };

  // //루트렌더 //출발 도착 넣으면 대중교통 길찾기 해주는 기능 있으면 좋긴할듯?
  // const renderRoute = () => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: { lat: 35.1165, lng: 129.0401 },
  //     zoom: 11,
  //   });
  //   console.log('useState잘되나', placeLocations);
  //   const directionsService = new window.google.maps.DirectionsService();
  //   const directionsRenderer = new window.google.maps.DirectionsRenderer();

  //   //경유지추가
  //   const stopovers =
  //     placeLocations &&
  //     placeLocations.slice(1, placeLocations.length - 1).map((item, idx) => {
  //       return { stopover: true, location: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) } };
  //     });

  //     // placeLocations.map((item, idx) => {
  //     //   return { stopver: true, location: { lat: item.lat, lng: item.lng } };
  //     // });

  //   console.log('경유지잘담기나', stopovers);

  //   if (placeLocations) {
  //     const request = {
  //       origin: {
  //         lat: parseFloat(placeLocations[0].lat),
  //         lng: parseFloat(placeLocations[1].lng),
  //       },
  //       destination: {
  //         lat: parseFloat(placeLocations[placeLocations.length - 1].lat),
  //         lng: parseFloat(placeLocations[placeLocations.length - 1].lng),
  //       },
  //       waypoints: stopovers,
  //       travelMode: window.google.maps.TravelMode.WALKING, //하... 구글맵 한국에서는 대중교통 기능에서만 곡선경로 해주는 거였구, 그리고 대중교통에서는 경유지 추가가 안된대 ㅜㅜ 두개사이만 가능함.. 왜 walking driving 한국에 지원안해주냐 구글 좀 해줘라 좀
  //       unitSystem: window.google.maps.UnitSystem.IMPERIAL,
  //     };
  //     console.log('요청뭐지', request);
  //     directionsService.route(request, function (result, status) {
  //       if (status === 'OK') {
  //         directionsRenderer.setMap(map);
  //         directionsRenderer.setDirections(result);
  //       } else {
  //         alert(status);
  //       }
  //     });
  //   }
  // };
  function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent('MouseEvent');
    simulatedEvent.initMouseEvent(
      {
        touchstart: 'dragstart',
        touchmove: 'dragover',
        // touchmove: 'dragging',
        touchend: 'dragend',
      }[event.type],
      true,
      true,
      window,
      1,
      touch.screenX,
      touch.screenY,
      touch.clientX,
      touch.clientY,
      false,
      false,
      false,
      false,
      0,
      null,
    );

    touch.target.dispatchEvent(simulatedEvent);
    event.cancelable && event.preventDefault();
  }

  function init() {
    document.addEventListener('touchstart', touchHandler, true);
    document.addEventListener('touchmove', touchHandler, true);
    document.addEventListener('touchend', touchHandler, true);
    document.addEventListener('touchcancel', touchHandler, true);
  }

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
    // dispatch(deleteAllPlace());
  };
  return (
    <PlannerContent className="planner-content">
      <PlaceBucket className="planner-box bucket">
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
