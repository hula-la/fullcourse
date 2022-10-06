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
import { Slider } from '@material-ui/core';

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 86.5vh;
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
  margin-left: 1.5vw;

  
  
  .slider {
    width: 5vw;
    /* margin: 0; */
    margin-right: 2vh;
    margin-bottom: 1vh;
  }
  .sortSelect {
    margin-left: 2vh;
    padding: 0;
  }
`;

const TypeContainer = styled.div`
  height: 7vh;
  margin-top: 1vh;

  justify-content: space-between;
`;

const PlaceTypes = styled.button`
  border: #0aa1dd 1px solid;
  margin: 2vh 0.5vh;

  border-radius: 0.5rem;
  width: 3vw;
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

const Wrapper = styled.div`
  position: relative;
  .icon {
    position: relative;
    right: 50px;
    top: 5px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 16vw;

  height: 3.5vh;
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
  margin-top: 65vh;
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

  const showPlaceTypes = ['여행', '문화', '숙소', '맛집', '체험'];
  const [maxPageNum, setMaxPageNum] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const { travelPlaceList } = useSelector((state) => state.trip);
  const [placeType, setPlaceType] = useState('travel');
  const [keyword, setKeyword] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [maxDist, setMaxDist] = useState(0);
  const [recentLat, setRecentLat] = useState(0);
  const [recentLng, setRecentLng] = useState(0);
  const marks = [
    {
      value: 0,
      label: '0km',
    },
    {
      value: 50,
      label: '5km',
    },
    {
      value: 100,
      label: '10km',
    },
  ];

  var lats = [];
  var lngs = [];
  var flag = false;
  var flag2 = false;
  const onHandleSlider = (value) => {
    if (value) {
      setMaxDist(value / 10);
    }
  };

  const onClickSlider = () => {
    
    setPageNum(0);
    const dailyItem = [...document.querySelectorAll('.daily')].map(
      (plannerBox) => {
        const placeInfo = [...plannerBox.querySelectorAll('.list-item')].map(
          (placeItem, idx) => {
            const placeData = placeItem.dataset;
            const lng = placeData.placeLng;
            const lat = placeData.placeLat;
            lngs.forEach((item, idx) => {
              if (item === lng) {
                flag = true;
              } else {
                flag = false;
              }
            });
            if (flag === false) {
              lngs.push(parseFloat(lng));
            }
            lats.forEach((item, idx) => {
              if (item === lat) {
                flag2 = true;
              } else {
                flag2 = false;
              }
            });
            if (flag2 === false) {
              lats.push(parseFloat(lat));
            }
          },
        );
      },
    );
    const resLat = lats.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    const avgLat = resLat / lats.length;
    setRecentLat(avgLat);
    const resLng = lngs.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    const avgLng = resLng / lngs.length;
    setRecentLng(avgLng);
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
    dispatch(
      fetchTravelPlace({
        sortReq,
        placeType,
        pageNum,
        keyword,
        maxDist,
        recentLat,
        recentLng,
      }),
    );
  }, [
    dispatch,
    placeType,
    pageNum,
    sortReq,
    keyword,
    maxDist,
    recentLat,
    recentLng,
  ]);

  const onClickPage = (e) => {
    const nowPage = parseInt(e.target.outerText);

    setPageNum(nowPage - 1);
  };

  const changePlaceList = (id, e) => {
    e.preventDefault();
    // setKeyword('')
    setPageNum(0);
    setMaxDist(0);
    setRecentLat(0);
    setRecentLng(0);
    for (var i = 0; i < placeTypes.length; i++) {
      if (i === id) {
        setPlaceType(placeTypes[id]);
        setIsActive(id);
      }
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      setKeyword(e.target.value);
      setPageNum(0);
      setMaxDist(0);
      setRecentLat(0);
      setRecentLng(0);
    }
  };

  const onClickSearch = (e) => {};

  const onFocus = (e) => {
    e.target.placeholder = '';
  };

  const onChange = (e) => {
    if (e.target.value.length == 0) {
      e.target.placeholder = '키워드를 검색해보세요';
    }
  };

  return (
    <PlaceContainer className="place-container">
   
      <TypeContainer>
        {showPlaceTypes.map((item, id) => (
          <PlaceTypes
            key={id}
            className={id === isActive ? 'type-selected' : ''}
            onClick={(e) => {
              changePlaceList(id, e);
            }}
          >
            {item}
          </PlaceTypes>
        ))}
      </TypeContainer>
      <SortBox>
        <Slider
          className="slider"
          getAriaValueText={onHandleSlider}
          step={5}
          marks={marks}
          onClick={onClickSlider}
        />
        <SortSelect
          className="sortSelect"
          sort={sort}
          setSort={setSort}
          setSortReq={setSortReq}
          placeType={placeType}
          setPageNum={setPageNum}
          setMaxDist={setMaxDist}
          setRecentLat={setRecentLat}
          setRecentLng={setRecentLng}
          setKeyword={setKeyword}
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
