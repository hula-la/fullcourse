import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchTravelPlace } from '../../../features/trip/tripActions';
import { setPlaceItem, setMarkers } from '../../../features/trip/tripSlice';
import { Pagination } from '@mui/material';
import PlaceList from './PlaceList';
import SortSelect from './SortSelect';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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

  &.type-selected {
    color: #ffffff;
    background-color: #0aa1dd;
  }
`;

const ArrowIcon = styled(KeyboardArrowDown)`
  font-size: 2.5vmin !important;
`;

const Wrapper = styled.div`
  /* margin: 0 20%; */
  position: relative;
  .icon {
    position: relative;
    right: 50px;
    top: 5px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 20vw;

  height: 4vh;
  margin-left: 1.25vw;
  margin-top: 1vh;
  padding: 3px;
  font-size: 1rem;
  text-align: center;
  border: 0.5px solid #0aa1dd;
  border-radius: 5rem;
  background-color: rgba(217, 239, 255, 1);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  font-family: Tmoney;
  outline: none;
  &:focus {
    background-color: #eef8ff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
    transition: 0.5s;
  }
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
  const [sort, setSort] = useState('기본순');
  const [sortReq, setSortReq] = useState('');
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
  const [keyword, setKeyword] = useState('');
  const [isActive, setIsActive] = useState(0);

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
    dispatch(fetchTravelPlace({ sortReq, placeType, pageNum, keyword }));
  }, [dispatch, placeType, pageNum, sortReq, keyword]);

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
        setIsActive(id);
      }
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      setKeyword(e.target.value);
    }
  };

  const onClickSearch = (e) => {};

  const onFocus = (e) => {
    e.target.placeholder = '';
  };

  const onChange = (e) => {
    // setKeyword(e.target.value);
    if (e.target.value.length == 0) {
      e.target.placeholder = '키워드를 검색해보세요';
    }
  };

  return (
    <PlaceContainer className="place-container">
      <SortBox>
        <TypeContainer>
          {showPlaceTypes.map((item, id) => (
            <PlaceTypes
              className={id === isActive ? 'type-selected' : ''}
              onClick={(e) => {
                changePlaceList(id, e);
              }}
            >
              {item}
            </PlaceTypes>
          ))}
        </TypeContainer>
        <SortSelect
          sort={sort}
          setSort={setSort}
          setSortReq={setSortReq}
          placeType={placeType}
        ></SortSelect>
      </SortBox>
      <Wrapper>
        <Input
          placeholder="키워드를 검색해보세요"
          onFocus={onFocus}
          onChange={onChange}
          onKeyPress={handleOnKeyPress}
        ></Input>
        <SearchOutlinedIcon className="icon" onClick={onClickSearch} />
        {/* <Button>검색</Button> */}
      </Wrapper>

      <PlaceList
        className="place-list"
        map={map}
        placeType={placeType}
        keyword={keyword}
        sortReq={sortReq}
        pageNum={pageNum}
      />
      <PageBox>
        {travelPlaceList ? (
          <Pagination
            count={maxPageNum}
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
