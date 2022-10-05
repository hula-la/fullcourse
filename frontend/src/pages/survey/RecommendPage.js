import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRecommendPlace } from '../../features/survey/surveyActions';
import { deletePlace } from '../../features/survey/surveySlice';
// import { likePlace } from '../../features/survey/surveySlice';
import RecommendCard from '../../components/trip/recommend/RecommendCard';
import styled from 'styled-components';

//액션 임포트
import { fetchPlaceDetail } from '../../features/trip/tripActions';
import { setPlaceItem, setMarkers } from '../../features/trip/tripSlice';

// skip 아이콘
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const PlanButton = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 0.1rem 0.4rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 2px solid;

  &:hover {
    transform: scale(1.1);
    animation-duration: 0.2s;
  }
`;

const RecommendHeader = styled.div`
  display: flex;
  align-items: center;
  height: 15%;
  font-weight: bold;
  font-size: 1.3rem;

  .title {
    padding: 0 2rem;
  }

  @media (min-width: 375px) and (max-width: 800px) {
    .title {
      padding-right: 8rem;
    }
  }

  span {
    color: #3f73d2;
    margin: 0 0.5rem;
  }
`;

const RecommendPlaceList = styled.div`
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (min-width: 375px) and (max-width: 800px) {
    overflow-x: scroll;
    display: -webkit-box;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #dc3e5a;
    border: 3px solid white;
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;

const LikePlaceList = styled.div`
  padding: 0 1rem;
  height: 30%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  /* div{
  height: 100%;
} */
  .likeCnt {
    padding: 0.4rem;
  }
  img {
    border-radius: 0.8rem;
    height: 100%;
    object-fit: cover;

    width: calc(100vh * 0.25 * 0.6 - 2rem);
    height: calc(100vh * 0.25 * 0.6 - 2rem);
  }

  .continueBtn {
    cursor: pointer;

    &:hover {
      background: #c8c3ff;
    }
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    justify-content: flex-start;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    .likePlaceName {
      font-size: 0.7rem;
    }
  }

  .imgContainer {
    display: inline-block;
    position: relative;
  }
  .imgContainer .deletebtn {
    display: none;
  }
  .imgContainer:hover .deletebtn {
    position: absolute;
    right: 6%;
    top: 6%;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: red;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .likePlace {
    margin: 0 1rem;
    font-weight: bold;
  }
  .likePlaceBox {
    height: 65%;
    width: 50%;
    max-width: 50rem;
  }

  .likePlaceContainer {
    white-space: nowrap;
    display: flex;
    align-items: center;

    height: 100%;
    width: 100%;
    /* height: 65%;
    width: 50%;
    max-width: 50rem; */
    /* background: #e2dfff; */
    border-radius: 1rem;
    /* height:10%; */
    overflow-x: auto;
    overflow-y: hidden;
    border: 4px solid transparent;

    /* background: url(/img/surveyIcon/likePlaceContainer.png); */
    /* background-size: 100% 100%; */

    img{
      border: double 7px #333333;
    }

    &:hover {
      border: 4px solid #333333 !important;
    }
  }

  /* 스크롤바 설정*/
  @media only screen and (min-device-width: 800px) {
    .likePlaceContainer::-webkit-scrollbar {
      width: 10px;
    }
  }

  /* 스크롤바 막대 설정*/
  /* .likePlaceContainer::-webkit-scrollbar-thumb{
  
    background-color: transparent;

  } */

  .likePlaceContainer::-webkit-scrollbar-thumb {
    background-clip: padding-box;

    background-color: white;
    /* 스크롤바 둥글게 설정    */
    border-radius: 1rem;
    border: 4px solid transparent;
  }

  /* 스크롤바 뒷 배경 설정*/

  .likePlaceContainer::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  .buttonContainer {
    position: absolute;
    right: 5%;
    bottom: 30%;
    font-weight: bold;
    color: #5b4afe;

    display: flex;
    flex-direction: column;
    align-content: center;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    .buttonContainer {
      width: 4rem;
    }
  }
  .buttonContainer span {
    color: #7c87d5;
  }

  .maxLike {
    color: red;
  }

  button {
    border: none;
    border-radius: 1rem;
    padding: 0.5rem 0.6rem;
    background: #e2dfff;
    margin-top: 1rem;
    font-weight: bold;
  }
`;

const RecommendPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendPlaceList } = useSelector((state) => state.survey);
  const { randomPlaceList } = useSelector((state) => state.survey);
  const { number } = useSelector((state) => state.survey);
  const { likePlaceList } = useSelector((state) => state.survey);
  const { placeId } = location.state;
  const { likePlaceIndex } = useSelector((state) => state.survey);

  const { markers, map } = useSelector((state) => state.trip);

  useEffect(() => {
    console.log(randomPlaceList.length);
    console.log(number);
  }, [number]);

  useEffect(() => {
    if (placeId) {
      dispatch(fetchRecommendPlace(placeId));
    }
  }, [dispatch, placeId]);

  // const onClickAdd = (index, e) => {
  //   dispatch(likePlace(recommendPlaceList[index]));
  // };
  // 좋아요 장소 삭제
  const deleteLikePlace = (index, e) => {
    dispatch(deletePlace(likePlaceList[index]));
  };

  const addMarker = (lat, lng) => {
    const position = { lat: lat, lng: lng };
    const marker = new window.google.maps.Marker({
      map,
      position: position,
    });
    marker['position'] = position;
    dispatch(setMarkers(marker));
  };

  // 좋아요한 리스트 다 추가한 후 일정 페이지로 이동
  const setStartPlaceInfo = (likePlaceIndex, e) => {
    likePlaceIndex.forEach((id) => {
      const placeId = id;
      const placeType = 'travel';
      dispatch(fetchPlaceDetail({ placeId, placeType }))
        .unwrap()
        .then((res) => {
          let placeItemObj = new Object();
          const data = res.data;
          placeItemObj.placeId = placeId;
          placeItemObj.name = data.name;
          placeItemObj.imgUrl = data.imgUrl;
          placeItemObj.draggable = true;
          placeItemObj.lat = data.lat;
          placeItemObj.lng = data.lng;
          dispatch(setPlaceItem(placeItemObj));
          addMarker(data.lat, data.lng);
        });
    });
    navigate('/trip/plan');
  };

  const onClickContinue = () => {
    navigate('/trip/survey');
  };

  return (
    <Wrapper>
      <PlanButton
        onClick={(e) => {
          setStartPlaceInfo(likePlaceIndex, e);
        }}
      >
        일정짜기 <SkipNextIcon />
      </PlanButton>

      {recommendPlaceList.length!=0 && (
        <>
          <RecommendHeader>
            <div className="title">
              당신이 선택한 <span>{recommendPlaceList[0].name}</span> 와 비슷한
              여행지
            </div>
          </RecommendHeader>
          <RecommendPlaceList>
            {recommendPlaceList.map((place, index) => {
              return <RecommendCard place={place} index={index} />;
            })}
          </RecommendPlaceList>
        </>
      )}

      <LikePlaceList>
        <div className="tooltip likePlaceBox">
          <span className="tooltiptext tooltip-top">
            <p>당신이 선택한 장소들이 담깁니다.</p>
          </span>
          {likePlaceList.length >= 0 && (
            <>
              <div className="likePlaceContainer">
                {likePlaceList.map((place, index) => {
                  return (
                    <div className="likePlace">
                      <div className="imgContainer">
                        <div
                          className="deletebtn"
                          onClick={(e) => deleteLikePlace(index, e)}
                        >
                          -
                        </div>

                        <img src={place.imgUrl} />
                      </div>
                      <div className="likePlaceName">{place.name}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="buttonContainer">
          <div className="tooltip">
            <div
              className={
                likePlaceList.length == 5 ? `maxLike likeCnt` : `likeCnt`
              }
            >
              {likePlaceList.length} /5
            </div>
            <div className="tooltiptext tooltip-left">
              <p>최대 5개의 장소를 선택해보세요.</p>
            </div>
          </div>
          <button className="continueBtn" onClick={onClickContinue}>
            계속 <span>▶</span>
          </button>
        </div>
      </LikePlaceList>
    </Wrapper>
  );
};

export default RecommendPage;
