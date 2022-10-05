import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomPlace } from '../../features/survey/surveyActions';
import { deletePlace, passPlace,setNumber } from '../../features/survey/surveySlice';
import styled from 'styled-components';

//액션 임포트
import { fetchPlaceDetail } from '../../features/trip/tripActions';
import { setPlaceItem, setMarkers } from '../../features/trip/tripSlice';

// skip 아이콘
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  

  .planButtonContainer {
    position: absolute;
    top: 3%;
    right: 3%;
  }

  .maxLike {
    color: red;
  }

  

  .box1{
  border-width: 3px 4px 3px 5px;
  border-radius:95% 4% 92% 5%/4% 95% 6% 95%;
  transform: rotate(2deg);
  border: 5px solid black;
}
`;

const PlanButton = styled.div`
  /* position: absolute;
top:5%;
right:5%; */
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

// const PlanButton = styled.div`
// font-weight:bold;
// cursor:pointer;
// `
const SurveyHeader = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  .title {
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  .subtitle {
    padding: 0 2rem;
  }
`;
const RandomPlaceList = styled.div`
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: center; */

  /* border-radius: 50%; */

  .placeImg {
    height: 100%;
    /* max-width: 60%; */
    object-fit: contain;
  }
  .placeImgContainer {
    /* padding-top: 1rem; */
    height: 100%;
    max-width: 60%;
    display: block; /* 영역적용위해 사용 */
    /* width: 100%; height: 100%; */

    overflow: hidden;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  .placeImgContainer:hover figcaption,
  .placeImgContainer:focus figcaption {
    /* 마우스를 올리면 보이게 처리 */
    opacity: 1;
  }

  .placeImgContainer figcaption {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    position: absolute; /* 이미지와 겹치게 처리 */
    top: 0;
    left: 0;

    color: #fff;
    text-align: center;
    /* line-height: 200px; */

    opacity: 0; //처음엔 안보이고

    transition: 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  button img {
    height: 2rem;
  }
  .buttonContainer {
    position: absolute;
    right: 10%;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    .buttonContainer {
      right: 2%;
    }
  }

  .tooltip {
    margin: 1rem 0px;
  }
  .buttonContainer button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    background: none;
    border: none;

    font-weight: bold;
    cursor: pointer;
  }
  .buttonContainer button:hover {
    /* background-color: #e0e0ff; */

    /* 흔들리는 애니메이션 */
    transform-origin: 50% 50%;
    animation-name: shake;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    /* animation-delay: 0.5s; */

    @keyframes shake {
      0% {
        transform: rotate(0deg) scale(1.1);
      }
      25% {
        transform: rotate(5deg) scale(1.1);
      }
      50% {
        transform: rotate(-5deg) scale(1.1);
      }
      75% {
        transform: rotate(5deg) scale(1.1);
      }
      100% {
        transform: rotate(0deg) scale(1.1);
      }
    }
  }
`;

// 좋아요 리스트
const LikePlaceList = styled.div`
  padding: 0 1rem;
  height: 30%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    height: 25%;
  }

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

  @media only screen and (min-device-width: 375px) and (max-device-width: 800px) {
    .likePlaceName {
      font-size: 0.8rem;
    }
  }

  .likePlace {
    margin: 0 1rem;
    font-weight: bold;
  }

  .likePlaceBox {
    height: 80%;
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

    /* background: url(/img/surveyIcon/likePlaceContainer.png);
    background-size: 100% 100%; */
    border-radius: 1rem;

    img{
      border: double 7px #333333;
    }

    &:hover {
      border: 4px solid #333333 !important;
    }
    /* 스크롤바 */
    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;
  
      background-color: white;
      /* 스크롤바 둥글게 설정    */
      border-radius: 1rem;
      border: 2px solid black;
    }
    @media only screen and (min-device-width: 479px) {
      &::-webkit-scrollbar {
        width: 10px;
      }
    }
  
    /* 스크롤바 뒷 배경 설정*/
  
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  /* 스크롤바 설정*/

  /* 스크롤바 막대 설정*/
  /* .likePlaceContainer::-webkit-scrollbar-thumb{
  
    background-color: transparent;

  } */



  .buttonContainer {
    position: absolute;
    right: 5%;
    bottom: 30%;
    font-weight: bold;
    color: #5b4afe;
  }
  .buttonContainer span {
    color: #7c87d5;
  }

  button {
    border: none;
    border-radius: 1rem;
    padding: 0.5rem 0.6rem 0.5rem 1rem;
    background: #e2dfff;
    margin-top: 1rem;
    font-weight: bold;
  }

  .tooltip-left.max-place{
    top: -12px;
    right: 115%;
  }
`;

const SurveyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recommendPlaceList } = useSelector((state) => state.survey);
  const { randomPlaceList } = useSelector((state) => state.survey);
  const { number } = useSelector((state) => state.survey);
  const { likePlaceList } = useSelector((state) => state.survey);
  const { likePlaceIndex } = useSelector((state) => state.survey);

  const { markers, map } = useSelector((state) => state.trip);

  useEffect(() => {
    // if (number == randomPlaceList.length) {
    //   alert("마지막 장소입니다.");
    //   setNumber(randomPlaceList.length - 1);
    // }
    console.log(randomPlaceList.length);
    console.log(number);
  }, [number]);

  useEffect(() => {
    dispatch(fetchRandomPlace());
  }, [dispatch]);

  useEffect(() => {
    if (randomPlaceList.length != 0) {
      if (number == randomPlaceList.length) {
        dispatch(setNumber(randomPlaceList.length - 1));
        alert("마지막 장소입니다.");
      }
      else if (likePlaceIndex.includes(randomPlaceList[number].placeId)) {
        dispatch(passPlace());
      }
    }
  }, [number]);

  // 좋아요 장소 삭제
  const deleteLikePlace = (index, e) => {
    dispatch(deletePlace(likePlaceList[index]));
  };

  //시작 위치 마커 추가
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

  const onClickLike = async () => {
    await dispatch(passPlace());
    await navigate('/trip/recommend', {
      state: {
        placeId: randomPlaceList[number].placeId,
      },
    });
  };

  const onClickContinue = () => {
    navigate('/trip/survey');
  };

  const onClickPass = () => {
    dispatch(passPlace());
  };
  return (
    <Wrapper>
      <div className="tooltip planButtonContainer">
        <PlanButton
          onClick={(e) => {
            setStartPlaceInfo(likePlaceIndex, e);
          }}
        >
          일정짜기 <SkipNextIcon />
        </PlanButton>
        <span className="tooltiptext tooltip-bottom">
          <p>당신이 선택한 여행지들과 함께 일정 짜기 페이지로 넘어갑니다.</p>
        </span>
      </div>
      <SurveyHeader>
        <div className="title">여행지 추천</div>
        <div className="subtitle">
          당신의 취향의 여행지를 선택하시면, 비슷한 여행지를 추천해 드릴게요:)
        </div>
      </SurveyHeader>
      <RandomPlaceList>
        {(randomPlaceList.length != 0 &&
        number < randomPlaceList.length)
        ? (
          <>
            <span className="placeImgContainer box1">
              <img className="placeImg" src={randomPlaceList[number].imgUrl} />
              <figcaption>
                <div>{randomPlaceList[number].name}</div>
              </figcaption>
            </span>
            <div className="buttonContainer">
              <div className="tooltip">
                <button onClick={onClickLike}>
                  <img src="\img\surveyIcon\good.png" />
                  좋아요
                </button>
                <span className="tooltiptext tooltip-left goodbtn">
                  <p>
                    like 버튼을 누르면, 해당 장소와 비슷한 장소들을
                    추천해줍니다.
                  </p>
                </span>
              </div>

              <div className="tooltip">
                <button onClick={onClickPass}>
                  <img src="\img\surveyIcon\bad.png" />
                  싫어요
                </button>
                <span className="tooltiptext tooltip-left badbtn">
                  <p>pass 버튼을 누르면, 다음 장소를 보여줍니다.</p>
                </span>
              </div>
            </div>
          </>
        ) : null}
      </RandomPlaceList>
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
            <div className="tooltiptext tooltip-left max-place">
              <p>최대 5개의 장소를 선택해보세요.</p>
            </div>
          </div>
          {/* <button onClick={onClickContinue}>continue <span>▶</span></button> */}
        </div>
      </LikePlaceList>
    </Wrapper>
  );
};

export default SurveyPage;
