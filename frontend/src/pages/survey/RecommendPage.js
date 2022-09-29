import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRecommendPlace } from '../../features/survey/surveyActions';
// import { likePlace } from '../../features/survey/surveySlice';
import RecommendCard from '../../components/trip/recommend/RecommendCard';
import styled from 'styled-components';

const Wrapper = styled.div`
height:calc(100vh - 80px);


`

const RecommendHeader = styled.div`
display:flex;
align-items: center;
height:15%;
font-weight: bold;
font-size: 1.3rem;

.title{
  padding: 0 2rem;

}

span{
  color: #3f73d2;
  margin: 0 0.5rem;
}

`

const RecommendPlaceList = styled.div`
height:55%;
display: flex;
align-items: center;
justify-content: space-around;
`;

const LikePlaceList = styled.div`
    padding: 0 1rem;
height:30%;
position: relative;

display: flex;
align-items: center;
justify-content: center;

white-space: nowrap;
/* div{
  height: 100%;
} */
img{
  border-radius: 0.8rem;
    height: 100%;   
    object-fit: cover;

    width: calc((100vh - 80px) * 0.25 * 0.6 - 2rem);
    height: calc((100vh - 80px) * 0.25 * 0.6 - 2rem);
}

.imgContainer{
  display: inline-block;
  position: relative;
}
.imgContainer .deletebtn{
  display: none;
}
.imgContainer:hover .deletebtn{
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

.likePlace{
  margin: 0 2rem;
  font-weight: bold;
}

.likePlaceContainer{
  display: flex;
    align-items: center;

  height: 65%;
  width: 70%;
  max-width: 50rem;
  background:#e2dfff;
  border-radius: 1rem;
  /* height:10%; */
  overflow-x: scroll;
    overflow-y: hidden;
}

/* 스크롤바 설정*/

.likePlaceContainer::-webkit-scrollbar{
  
    width: 10px;
}

/* 스크롤바 막대 설정*/
/* .likePlaceContainer::-webkit-scrollbar-thumb{
  
    background-color: transparent;

  } */

.likePlaceContainer::-webkit-scrollbar-thumb{
  background-clip: padding-box;
  
    background-color: white;
    /* 스크롤바 둥글게 설정    */
    border-radius: 1rem;    
    border: 4px solid transparent;
  }
  
  /* 스크롤바 뒷 배경 설정*/
  
.likePlaceContainer::-webkit-scrollbar-track{
border-radius: 10px;    
  
}

.buttonContainer{
  position: absolute;
  right: 5%;
  bottom: 30%;
  font-weight: bold;
  color:#5b4afe;

    
}
.buttonContainer span{
  color:#7c87d5
}

button{
  border: none;
    border-radius: 1rem;
    padding: 0.5rem 0.6rem 0.5rem 1rem;
    background: #e2dfff;
    margin-top:1rem;
    font-weight: bold;
}
`


const RecommendPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendPlaceList } = useSelector((state) => state.survey);
  const { likePlaceList } = useSelector((state) => state.survey);
  const { placeId } = location.state;

  useEffect(() => {
    if (placeId) {
      dispatch(fetchRecommendPlace(placeId));
    }
  }, [dispatch, placeId]);

  // const onClickAdd = (index, e) => {
  //   dispatch(likePlace(recommendPlaceList[index]));
  // };

  const onClickContinue = () => {
    navigate('/trip/survey');
  };

  return (
    <Wrapper>
      {recommendPlaceList && (
        <>
        <RecommendHeader>
            <div className='title'>당신이 선택한 <span>{recommendPlaceList[0].name}</span> 와 비슷한 여행지</div>
    </RecommendHeader>
        <RecommendPlaceList>
          {recommendPlaceList.map((place, index) => {
            return (
              <RecommendCard
                place={place}
                index={index} />
            );
          })}
        </RecommendPlaceList>
        </>
      )}

      <LikePlaceList>
        <div className='likePlaceContainer'>

          {likePlaceList && (
            <>
              {likePlaceList.map((place, index) => {
                return (
                  <div className='likePlace'>
                    <div className='imgContainer'>
                      <div className='deletebtn'>
                        -
                      </div>

                    <img src={place.imgUrl} />
                    </div>
                    <div>
                      {place.name}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className='buttonContainer'>
          <div>

          {likePlaceList.length} /5     
          </div>
          <button onClick={onClickContinue}>continue <span>▶</span></button>
        </div>
      </LikePlaceList>
    </Wrapper>
  );
};

export default RecommendPage;
