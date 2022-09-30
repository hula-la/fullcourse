import React from 'react';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';

const ModalBackdrop = styled.div`
  width: 30vw;
  height: 70vh;
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

const PlaceReview = ({ openReviewModal, placeId, placeType, setIsOpen }) => {
  const sendToBack = (e) => {
    setIsOpen(false)
  };
  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToBack} />
      </ModalView>
    </ModalBackdrop>
  );
};

export default PlaceReview;
