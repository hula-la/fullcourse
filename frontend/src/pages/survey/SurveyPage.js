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
height:60%;
display: flex;
align-items: center;
justify-content: center;
/* border-radius: 50%; */

img{
    height: 100%;
    object-fit: contain;
}
button img{
    height: 2rem;
}
.buttonContainer{
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
        /* 30%{
        	transform: rotate(5deg);
        } */
        /* 40%{
        	transform: rotate(-10deg);
        }
        50%{
        	transform: rotate(10deg);
        }
        60%{
        	transform: rotate(-10deg);
        } */
        /* 70%{
        	transform: rotate(0deg);
        } */
        /* 100%{
        	transform: rotate(0deg);
        } */
    }
}
`
const LikePlaceLst = styled.div`
img{
    height: 100%;   
    object-fit: contain;
}
height:10%;
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
                <img src={randomPlaceList[number].imgUrl} />
                      <div className='buttonContainer'>
                          
                <button onClick={onClickLike}><img src='\img\surveyIcon\good.png'/>like</button>
                <button onClick={onClickPass}><img src='\img\surveyIcon\bad.png'/>pass</button>
                </div>
                </>
            ) : null}
              
          </RandomPlaceList>
          <LikePlaceLst>
              
            <div>
                {likePlaceList && (
                <>
                    {likePlaceList.map((place, index) => {
                    return <img key={index} src={place.imgUrl} />;
                    })}
                </>
                )}
            </div>
          </LikePlaceLst>
    </Wrapper>
  );
};

export default SurveyPage;
