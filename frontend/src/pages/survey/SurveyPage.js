import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomPlace } from '../../features/survey/surveyActions';
import { likePlace, passPlace } from '../../features/survey/surveySlice';

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
    <div>
      {randomPlaceList ? (
        <>
          <img src={randomPlaceList[number].imgUrl} />
          <button onClick={onClickLike}>like</button>
          <button onClick={onClickPass}>pass</button>
        </>
      ) : null}
      <div>
        {likePlaceList && (
          <>
            {likePlaceList.map((place, index) => {
              return <img key={index} src={place.imgUrl} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
