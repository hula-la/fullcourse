import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import PlaceDetailContent from './PlaceDetailContent';
import { AiOutlineHeart, AiOutlineStar, AiFillHeart } from 'react-icons/ai';
import { BiCalendarPlus } from 'react-icons/bi';
import { createPlaceLike } from '../../../features/trip/tripActions';
import PlaceReview from './PlaceReview';
const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  /* padding: 3.5rem 4rem; */
  /* background-color: #fff3f8; 눈편한흰색*/
  background-color: #e8f9fd;
  border-radius: 2vh;
  color: #333333;
  position: relative;
  width: 30vw;
  height: 70vh;
  /* border: 3px dashed #0aa1dd; */
  box-shadow: 1px 2px 4px 1px rgb(0 0 0 / 10%);

  .placeImg {
    max-width: 100%;
    height: 30vh;
    border-radius: 2vh 2vh 0 0;
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
`;
const LikeNo = styled(AiOutlineHeart)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  margin: 0 1vw;
  background-color: #ffe3e1;
  cursor: pointer;
`;
const Plus = styled(BiCalendarPlus)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;

  margin: 0 1vw;
  background-color: #ffe3e1;
`;
const Review = styled(AiOutlineStar)`
  font-size: 4.5vmin;
  color: #e36387;
  border: 4px solid #ffe3e1;
  border-radius: 100%;
  margin: 0 1vw;
  background-color: #ffe3e1;
  cursor: pointer;
`;

const PlaceDetailModal = ({ openDetailModal, imgUrl, placeId, placeType }) => {
  const { placeDetail } = useSelector((state) => state.trip);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const placeLike = (placeId, placeType) => {
    setIsLiked(!isLiked);
    dispatch(createPlaceLike({ placeId, placeType }));
  };

  const openReivewModal = () => {
    setIsOpen(!isOpen);
  };

  const closePlaceDetailModal = () => {
    openDetailModal(false);
  };

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={closePlaceDetailModal} />
        <img className="placeImg" src={imgUrl} alt="place detail image" />
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
            <Plus />
            <span className="like">장소담기</span>
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
      </ModalView>
    </ModalBackdrop>
  );
};

export default PlaceDetailModal;
