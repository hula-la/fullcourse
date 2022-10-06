import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import PlaceDetailContent from './PlaceDetailContent';
import {
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineComment,
} from 'react-icons/ai';

import { createPlaceLike } from '../../../features/trip/tripActions';
import PlaceReview from './PlaceReview';
import { fetchPlaceReview } from '../../../features/trip/tripActions';
import ReviewListModal from './ReviewListModal';

const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  min-width: 300px;
  /* padding: 3.5rem 4rem; */
  /* background-color: #ffffff; 눈편한흰색*/
  background-color: #e8f9fd;
  border-radius: 2vh;
  color: #333333;
  position: relative;
  width: 30vw;
  @media only screen and (min-device-width: 330px) and (max-device-width: 600px) {
    min-width: 70vw;

  }
  height: 70vh;
  /* overflow-y: scroll; */
  /* border: 3px dashed #0aa1dd; */
  box-shadow: 1px 2px 4px 1px rgb(0 0 0 / 10%);
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #a4d8ff;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #e8f9fd;
    border-radius: 30px;
  }

  .place-img {
    max-width: 100%;
    height: 30vh;
    border-radius: 2vh 2vh 0 0;
    min-height: 30vh;
    min-width: 100%;
  }

  .box {
    display: flex;
    transform: translate(80%, -50%);
    z-index: 1;
    font-size: 1.5vmin;
    margin-top: 1vh;
    width: 10vw;
    span {
      margin-top: 1vh;
    }
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

const IconBox = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeYes = styled(AiFillHeart)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  margin: 0 1vw;
  background-color: #ffe3e1;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const LikeNo = styled(AiOutlineHeart)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  margin: 0 1vw;
  background-color: #ffe3e1;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const ReviewList = styled(AiOutlineComment)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  cursor: pointer;
  margin: 0 1vw;
  background-color: #ffe3e1;
  &:hover {
    transform: scale(1.05);
  }
`;
const Review = styled(AiOutlineStar)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  margin: 0 1vw;
  background-color: #ffe3e1;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const PlaceDetailModal = ({
  openDetailModal,
  imgUrl,
  placeId,
  placeType,
  randomImgUrl,
}) => {
  const { placeDetail, reviews } = useSelector((state) => state.trip);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const dispatch = useDispatch();
  const placeLike = (placeId, placeType) => {
    setIsLiked(!isLiked);
    dispatch(createPlaceLike({ placeId, placeType }));
  };

  const openReivewModal = () => {
    setIsOpen(!isOpen);
  };

  const openReivewListModal = () => {
    setIsListOpen(!isListOpen);
  };

  const closePlaceDetailModal = () => {
    openDetailModal(false);
  };

  useEffect(() => {
    dispatch(fetchPlaceReview({ placeId, placeType }));
  }, []);

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={closePlaceDetailModal} />
        {imgUrl !== null ? (
          <img src={imgUrl} className="place-img" alt="" />
        ) : (
          <img src={randomImgUrl} className="place-img" alt="" />
        )}

        <div className="box">
          <IconBox>
            {placeDetail ? (
              <>
                {placeDetail.isLiked ? (
                  isLiked ? (
                    <LikeNo
                      onClick={(e) => {
                        placeLike(placeId, placeType);
                      }}
                    />
                  ) : (
                    <LikeYes
                      onClick={(e) => {
                        placeLike(placeId, placeType);
                      }}
                    />
                  )
                ) : isLiked ? (
                  <LikeYes
                    onClick={(e) => {
                      placeLike(placeId, placeType);
                    }}
                  />
                ) : (
                  <LikeNo
                    onClick={(e) => {
                      placeLike(placeId, placeType);
                    }}
                  />
                )}
              </>
            ) : null}
            <span className="like">좋아요</span>
          </IconBox>
          <IconBox>
            <ReviewList
              onClick={() => {
                openReivewListModal();
              }}
            />
            <span className="like">리뷰목록</span>
          </IconBox>
          <IconBox>
            <Review
              onClick={() => {
                openReivewModal();
              }}
            />
            <span className="like">리뷰쓰기</span>
          </IconBox>
        </div>

        {placeDetail ? <PlaceDetailContent /> : null}
        {isOpen ? (
          <PlaceReview
            openReivewModal={openReivewModal}
            placeId={placeId}
            placeType={placeType}
            setIsOpen={setIsOpen}
          />
        ) : null}
        {isListOpen ? (
          <ReviewListModal
            openReivewListModal={openReivewListModal}
            placeId={placeId}
            placeType={placeType}
            setIsListOpen={setIsListOpen}
          />
        ) : null}
      </ModalView>
    </ModalBackdrop>
  );
};

export default PlaceDetailModal;
