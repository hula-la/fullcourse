import React from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  dropPlaceReview,
  fetchPlaceReview,
} from '../../../features/trip/tripActions';

const Container = styled.div`
  padding: 2vh 2vh;
`;

const Content = styled.div`
  .reviewTop {
    display: flex;
    margin-left: 3vw;
    margin-top: 2vh;
    justify-content: space-between;
    margin-right: 3vw;
  }
  .line {
    border: none;
    border-top: 3px dotted #0aa1dd;
    color: #fff;

    height: 1px;
    width: 21vw;
  }
  h5 {
    text-align: start;
    margin: 0;
  }
  p {
    text-align: start;
    margin: 0;
    margin-top: 1vh;
    font-size: 2vmin;
    margin-left: 3vw;
  }
  .rating {
    font-size: 2vmin;
    margin: 0;
  }
  .MuiRating-root {
    text-align: start;
  }
  .reviewImg {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0.5rem;
    width: 21vw;
    height: auto;
    margin-top: 2vh;
  }
  .content {
    width: 21vw;
    word-break: break-all;
    text-align: justify;
    margin-bottom: 5vh;
  }
  button {
    cursor: pointer;
    border: #ffffff;
    background-color: #ffffff;
    color: #b22323;
    border-radius: 20px;
    &:hover {
      color: #f73131;
      font-weight: bold;
    }
  }
`;

const ReviewListItem = ({ review, placeType, cnt }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onClickDelete = (review) => {
    const reviewId = review.reviewId;
    const placeId = review.placeId;
    dispatch(
      dropPlaceReview({
        placeType,
        reviewId,
      }),
    )
      .unwrap()
      .then((res) => {
        dispatch(fetchPlaceReview({ placeId, placeType }));
      });
  };

  return (
    <Container>
      <Content>
        <hr className="line"></hr>
        <div className="reviewTop">
          <h5>{review.nickname} <span>{review.isVisited ? '🚩' : null}</span></h5>
          {userInfo && userInfo.email === review.email ? (
            <button onClick={() => onClickDelete(review)}>삭제</button>
          ) : null}
        </div>

        <p>
          <Rating
            className="rating"
            name="read-only"
            value={review.score}
            readOnly
          ></Rating>
        </p>

        <p className="content">{review.content}</p>
        <img src={review.imgUrl} className="reviewImg" />
      </Content>
    </Container>
  );
};

export default ReviewListItem;
