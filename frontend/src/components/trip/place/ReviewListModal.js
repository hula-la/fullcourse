import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import ReviewListItem from './ReviewListItem';
import { fetchPlaceReview } from '../../../features/trip/tripActions';

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 4;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-decoration: none;

  background-color: #e8f9fd;
  border-radius: 2vh;
  color: #333333;

  width: 30vw;

  @media only screen and (min-device-width: 330px) and (max-device-width: 400px) {
    width: 85vw;

  }

  max-height: 70vh;
  min-height: 70vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  position: absolute;
  left: 0;
  top: 0;

  box-shadow: 1px 2px 4px 1px rgb(0 0 0 / 10%);
  animation: fadeInUp 2s;

  .reviewImg {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0.5rem;
    width: 21vw;
    height: 40%;
    margin-top: 4vh;
  }
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
`;

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  color: #88866f;
  cursor: pointer;
`;

const Empty = styled.div`
  margin: 21vh auto;
  font-size: 1.2rem;
`;

const ReviewTitle = styled.div`
  text-align: start;
  width: 5vw;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 60%, #a5f1e9 50%);
  font-weight: bold;
  .cnt {
    color: #727272;
  }
  margin-top: 6vh;
  margin-left: 5vh;

  @media only screen and (min-device-width: 330px) and (max-device-width: 400px) {
    width: 16vw;

  }
`;

const ReviewListModal = ({
  openReviewListModal,
  placeId,
  placeType,
  setIsListOpen,
}) => {
  const { reviews } = useSelector((state) => state.trip);

  const sendToBack = (e) => {
    setIsListOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlaceReview({ placeId, placeType }));
  }, []);
  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToBack} />
        <ReviewTitle>
          리뷰 <span className="cnt">{reviews.content.length}</span>
        </ReviewTitle>
        {reviews ? (
          reviews.content.length > 0 ? (
            reviews.content.map((review, index) => {
              return (
                <ReviewListItem
                  key={index}
                  review={review}
                  index={index}
                  cnt={reviews.content.length}
                  placeType={placeType}
                />
              );
            })
          ) : (
            <Empty>😅 아직 리뷰가 없어요 😅</Empty>
          )
        ) : null}
      </ModalView>
    </ModalBackdrop>
  );
};

export default ReviewListModal;
