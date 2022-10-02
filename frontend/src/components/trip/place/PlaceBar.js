import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchTravelPlace } from '../../../features/trip/tripActions';
import { setPlaceItem, setMarkers } from '../../../features/trip/tripSlice';
import { Pagination } from '@mui/material';
import PlaceList from './PlaceList';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const PlaceContainer = styled.div`
  height: 85vh;
  background-color: #e8f9fd;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 2vh;
  margin-top: 1vh;
  border-radius: 0 1rem 1rem 0;
  border-right: 3px dashed #a5f1e9;
  border-top: 3px dashed #a5f1e9;
  border-bottom: 3px dashed #a5f1e9;
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
  .JoySelect-listbox {
    background-color: white;
    border-color: #d9d9d9;
    font-size: 1vmin !important;
  }
`;

const SortBox = styled.div`
  margin-top: 1vh;
  display: flex;
  align-items: end;
  justify-content: center;
  margin-left: 2vh;
`;

const TypeContainer = styled.div`
  width: 13vw;
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2vh;
`;

const PlaceTypes = styled.button`
  border: #0aa1dd 1px solid;

  border-radius: 0.5rem;
  width: 4vw;
  height: 4vh;
  font-size: small;
  font-weight: bold;
  cursor: pointer;
  color: #0aa1dd;

  transition: background-color 500ms;
  &:hover {
    background-color: #0aa1dd;
    color: #ffffff;
    font-weight: bold;
  }
`;

const ArrowIcon = styled(KeyboardArrowDown)`
  font-size: 2.5vmin !important;
`;

const PageBox = styled.div`
  margin-top: 60vh;
  margin-bottom: 5vh;
  width: 50vh;
  display: flex;
  justify-content: center;
`;

const PlaceBar = ({ map }) => {
  const dispatch = useDispatch();
  const [placeTypes, setPlaceTypes] = useState([
    'travel',
    'culture',
    'hotel',
    'restaurant',
    'activity',
    'custom',
  ]);

  const showPlaceTypes = ['여행', '문화', '숙소', '맛집', '체험', '커스텀'];
  const [maxPageNum, setMaxPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const { travelPlaceList } = useSelector((state) => state.trip);
  const [placeType, setPlaceType] = useState('travel');

  // const placeItem = [] //슬라이스를 안쓰니까 담는 클릭을 할 때마다 placeItem이 초기화됨
  const addPlaceToPlanner = (
    placeId,
    placeName,
    placeImg,
    placeLat,
    placeLng,
    id,
    e,
  ) => {
    e.preventDefault();
    let placeItemObj = new Object();
    placeItemObj.placeId = placeId;
    placeItemObj.name = placeName;
    placeItemObj.imgUrl = placeImg;
    placeItemObj.draggable = true;
    placeItemObj.lat = placeLat;
    placeItemObj.lng = placeLng;
    placeItemObj.id = id;

    dispatch(setPlaceItem(placeItemObj));
  };

  const addMarker = (lat, lng) => {
    const position = { lat: lat, lng: lng };
    const marker = new window.google.maps.Marker({
      map,
      position: position,
    });
    console.log(typeof marker);
    marker['position'] = position;
    dispatch(setMarkers(marker));
  };

  useEffect(() => {
    if (travelPlaceList !== null) {
      let tmp = travelPlaceList.totalElements;
      let result = parseInt(tmp / 9);
      let remainder = tmp % 9;
      if (remainder === 0) {
        setMaxPageNum(result);
      } else {
        setMaxPageNum(result + 1);
      }
    }
  }, [travelPlaceList]);

  useEffect(() => {
    dispatch(fetchTravelPlace({ placeType, pageNum }));
  }, [dispatch, placeType, pageNum]);

  const onClickPage = (e) => {
    const nowPage = parseInt(e.target.outerText);
    console.log(nowPage);
    setPageNum(nowPage - 1);
  };

  const changePlaceList = (id, e) => {
    e.preventDefault();
    for (var i = 0; i < placeTypes.length; i++) {
      if (i === id) {
        setPlaceType(placeTypes[id]);
      }
    }
  };

  return (
    <PlaceContainer className="place-container">
      <SortBox>
        <TypeContainer>
          {showPlaceTypes.map((item, id) => (
            <PlaceTypes
              onClick={(e) => {
                changePlaceList(id, e);
              }}
            >
              {item}
            </PlaceTypes>
          ))}
        </TypeContainer>
        <Select
          placeholder="기본순"
          indicator={<ArrowIcon />}
          sx={{
            border: 'none',
            width: 115,
            fontSize: '1.8vmin',
            [`& .${selectClasses.indicator}`]: {
              transition: '0.2s',

              [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
              },
            },
          }}
        >
          <Option value="dog">SNS언급순</Option>
          <Option value="cat">기본순</Option>
          <Option value="cat">별점순</Option>
          <Option value="fish">좋아요순</Option>
          <Option value="bird">리뷰순</Option>
          <Option value="bird">담긴순</Option>
        </Select>
      </SortBox>

      <PlaceList className="place-list" map={map} placeType={placeType} />
      <PageBox>
        {travelPlaceList ? (
          <Pagination
            count={maxPageNum}
            // variant="outlined"
            // shape="rounded"
            // showFirstButton
            // showLastButton
            defaultPage={1}
            boundaryCount={2}
            size="small"
            onChange={onClickPage}
          />
        ) : null}
      </PageBox>
    </PlaceContainer>
  );
};

export default PlaceBar;
