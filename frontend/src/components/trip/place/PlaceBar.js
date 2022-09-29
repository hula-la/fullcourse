import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchTravelPlace } from '../../../features/trip/tripActions';
import { setPlaceItem, setMarkers } from '../../../features/trip/tripSlice';
import { Pagination } from '@mui/material';
import PlaceList from './PlaceList';

const PlaceContainer = styled.div`
  border: 1px solid;
  height: 87vh;
  background-color: #E8F9FD;
`;


const PlaceTypes = styled.button``;

const PageBox = styled.div`
  width: 55vh;
  display: flex;
  justify-content: center;
`



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
      console.log('어디서막히는거고');
      let tmp = travelPlaceList.totalElements;
      let result = parseInt(tmp / 9);
      let remainder = tmp % 9;
      console.log('얘안뜨지', result, remainder);
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
        console.log('동일한걸로 찎히나', placeTypes[id]);
        setPlaceType(placeTypes[id]);

        // dispatch(fetchTravelPlace(placeTypes[id]));
      }
    }
  };

  return (
    <PlaceContainer className="place-container">
      {placeTypes &&
        placeTypes.map((item, id) => (
          <PlaceTypes
            onClick={(e) => {
              changePlaceList(id, e);
            }}
          >
            {item}
          </PlaceTypes>
        ))}
     
        <PlaceList className="place-list" map={map} placeType={placeType}/>
      
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
