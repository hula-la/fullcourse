import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import { BiImageAdd } from 'react-icons/bi';
import '../../../pages/main/main.css';
import { createReview } from '../../../features/trip/tripActions';
import { useDispatch } from 'react-redux';
import { Rating } from '@mui/material';
import Box from '@mui/material/Box';
import { color, fontSize, textAlign } from '@mui/system';

const ModalBackdrop = styled.div`
  /* width: 30vw;
  height: 70vh;
  position: fixed;
  top: 0;
  left: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 4;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  /* padding: 3.5rem 4rem; */
  /* background-color: #ffffff; 눈편한흰색*/
  background-color: #e8f9fd;
  border-radius: 2vh;
  color: #333333;

  width: 30vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  left: 0;
  top: 0;
  /* border: 3px dashed #0aa1dd; */
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
const ImgBtn = styled(BiImageAdd)`
  cursor: pointer;
  font-size: 4vmin;
  color: #0aa1dd;
  margin-top: 2vh;
`;

const StyledInput = styled.textarea`
  background-color: #ffffff;
  border: 2px solid #d9d9d9;
  border-radius: 0.5rem;
  font-size: 2vmin;
  padding: 2vh 1vw;
  margin: 0 0.5vw;
  width: 20vw;
  height: 12vh;
  font-family: Tmoney;
  margin-top: 1vh;
  color: #333333;

  &:hover {
    border: 2.5px solid #00cfb4;
  }
  &:focus {
    outline: none;
  }
`;

// const RateBox = styled.div`
//   position: relative;
//   cursor: default;

//   &:hover .rateTip {
//     visibility: visible;
//   }
// `

// const MannerRate = styled(Rating)`
//   && {
//     color: #fffc3e;
//     margin-right: 1rem;
//   }
// `

const OkBtn = styled.button`
  background-color: #a4d8ff;
  border: 0;
  width: 6vw;
  height: 4vh;
  border-radius: 0.5rem;
  font-family: Tmoney;
  font-size: 1.8vmin;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #8fbcde;
    color: #4e4e4e;
  }
  margin-top: 2vh;
`;

//필요한거 img, content, placeId, placeType
const PlaceReview = ({ openReviewModal, placeId, placeType, setIsOpen }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const imgRef = useRef();
  const [value, setValue] = useState(0);
  const [hover, setHover] = React.useState(-1);
  const dispatch = useDispatch();
  const sendToBack = (e) => {
    setIsOpen(false);
  };

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];

    console.log(file);
    setImageFile(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      console.log('이미지주소', reader.result);
    };
  };

  const onClickFileBtn = (e) => {
    imgRef.current.click();
  };

  const onChangeInput = (e) => {
    setReviewComment(e.target.value);
  };

  const submitReview = (placeType, placeId, e) => {


    dispatch(createReview({ imageFile, reviewComment,value, placeId, placeType }));
  };

  const onChangeStar = (e) => {
    if (e.target.value !== undefined) {
      setValue(e.target.value);
    }
  };

  const labels = {
    0: '별점을 선택해주세요!',
    1: '별로예요',
    2: '조금 아쉬워요',
    3: '주위에 있다면 가볼만해요',
    4: '꽤 가볼만해요',
    5: '꼭 가야 하는 곳이에요',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToBack} />
        <img
          className="reviewImg"
          src={imageUrl ? imageUrl : '/img/ReviewImgDefault.png'}
        ></img>
        <input
          type="file"
          ref={imgRef}
          onChange={onChangeImage}
          style={{ display: 'none' }}
        ></input>
        <ImgBtn
          onClick={() => {
            onClickFileBtn();
          }}
        />
        <Rating
          name="simple-controlled"
          value={value}
          onClick={onChangeStar}
          getLabelText={getLabelText}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box
            sx={{ fontSize: '1.5vmin', textAlign: 'center', color: '#727272' }}
          >
            {labels[hover !== -1 ? hover : value]}
          </Box>
        )}

        <StyledInput
          autoFocus={true}
          placeholder={'내용을 입력하세요'}
          onChange={onChangeInput}
        ></StyledInput>
        <OkBtn onClick={(e) => {submitReview(placeType, placeId, e); sendToBack()}}>
          작성완료
        </OkBtn>
      </ModalView>
    </ModalBackdrop>
  );
};

export default PlaceReview;
