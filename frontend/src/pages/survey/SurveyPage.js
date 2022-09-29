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
const RandomPlaceList = styled.div`
img{

    object-fit: contain;
}
height:50%;
`
const LikePlaceLst = styled.div`
img{

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
          <div>
              <div>여행지 추천</div>
              <div>당신의 취향의 여행지를 선택하시면, 비슷한 여행지를 추천해 드릴게요:)</div>
          </div>
          <RandomPlaceList>
            {randomPlaceList ? (
                <>
                <img src={randomPlaceList[number].imgUrl} />
                <button onClick={onClickLike}>like</button>
                <button onClick={onClickPass}>pass</button>
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
