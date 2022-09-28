import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRecommendPlace } from '../../features/survey/surveyActions';
import { likePlace } from '../../features/survey/surveySlice';

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

  const onClickAdd = (index, e) => {
    dispatch(likePlace(recommendPlaceList[index]));
  };

  const onClickContinue = () => {
    navigate('/trip/survey');
  };

  return (
    <div>
      {recommendPlaceList && (
        <>
          {recommendPlaceList.map((place, index) => {
            return (
              <div key={index}>
                <img src={place.imgUrl} />
                <button onClick={(e) => onClickAdd(index, e)}>추가하기</button>
              </div>
            );
          })}
        </>
      )}
      {likePlaceList && (
        <>
          {likePlaceList.map((place, index) => {
            return (
              <div key={index}>
                <img src={place.imgUrl} />
              </div>
            );
          })}
        </>
      )}
      <button onClick={onClickContinue}>contiue</button>
    </div>
  );
};

export default RecommendPage;
