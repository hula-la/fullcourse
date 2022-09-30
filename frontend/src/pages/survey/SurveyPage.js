import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomPlace } from '../../features/survey/surveyActions';
import { likePlace, passPlace } from '../../features/survey/surveySlice';
import styled from 'styled-components';

const Wrapper = styled.div`
height:calc(100vh - 80px);
`
const SurveyHeader = styled.div`
padding: 1rem 0;
    font-weight: bold;
.title {
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
}
`
const RandomPlaceList = styled.div`
height:55%;
display: flex;
align-items: center;
justify-content: center;
/* justify-content: center; */

/* border-radius: 50%; */


.placeImg{
    height: 100%;
    max-width: 60%;
    object-fit: contain;
}
button img{
    height: 2rem;
}
.buttonContainer{
  position: absolute;
  right:10%;
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
}
.buttonContainer button{
    margin:1rem 0px;
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
}
.buttonContainer button:hover{
    /* background-color: #e0e0ff; */

/* 흔들리는 애니메이션 */
    transform-origin: 50% 50%;
    animation-name: shake;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    /* animation-delay: 0.5s; */
    
    
    @keyframes shake{
        0%{
            transform: rotate(0deg) scale( 1.1 );
            
        }
        25%{
            transform: rotate(5deg) scale( 1.1 );
        }
        50%{
        	transform: rotate(-5deg) scale( 1.1 );
        }
        75%{
        	transform: rotate(5deg) scale( 1.1 );
        }
        100%{
        	transform: rotate(0deg) scale( 1.1 );
        }
    }
}
`
const LikePlaceLst = styled.div`
img{
    height: 100%;   
    object-fit: contain;
}

.likePlaceContainer{
  height: 80%;
  width: 70%;
  background: pink;
  border-radius: 1rem;
}
height:10%;
`


// 좋아요 리스트
const LikePlaceList = styled.div`
    padding: 0 1rem;
height:30%;
position: relative;
white-space: nowrap;

display: flex;
align-items: center;
justify-content: center;

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
  position: relative;
}
.imgContainer .deletebtn{
  display: none;
}
.imgContainer:hover .deletebtn{
  position: absolute;
  right: 10%;
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



const SurveyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { randomPlaceList } = useSelector((state) => state.survey);
  const { number } = useSelector((state) => state.survey);
  const { likePlaceList } = useSelector((state) => state.survey);
  const { likePlaceIndex } = useSelector((state) => state.survey);

  useEffect(() => {
    dispatch(fetchRandomPlace());
  }, [dispatch]);

  
  useEffect(() => {
    if (randomPlaceList) {
      if (likePlaceIndex.includes(randomPlaceList[number].placeId)) {
        dispatch(passPlace());
      }
    }
  }, [number]);
  
  const onClickLike = () => {
    navigate('/trip/recommend', {
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
          <SurveyHeader>
              <div className='title'>여행지 추천</div>
              <div className='subtitle'>당신의 취향의 여행지를 선택하시면, 비슷한 여행지를 추천해 드릴게요:)</div>
          </SurveyHeader>
          <RandomPlaceList>
            {randomPlaceList ? (
                <>
                <img className='placeImg' src={randomPlaceList[number].imgUrl} />
                  <div className='buttonContainer'>
                          
                <button onClick={onClickLike}><img src='\img\surveyIcon\good.png'/>like</button>
                <button onClick={onClickPass}><img src='\img\surveyIcon\bad.png'/>pass</button>
                </div>
                </>
            ) : null}
              
          </RandomPlaceList>
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

export default SurveyPage;
