import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDiary } from '../../../features/user/userActions';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: 0px 0px;
  border-top: 1.5px solid #d8d8d8;

  text-align: left;
  padding: 1.5rem 0;

  .day {
    font-weight: bold;
    color: #333333;
    position: absolute;
    top: -0.8rem;
    left: calc(50% - 2rem);
    z-index: 71;
    background-color: white;
    /* padding: 10px; */
    width: 4rem;
    text-align: center;
    margin: 0px;
    height: 1.6rem;
  }
`;

const PlaceIdx = styled.div`
  margin-right: 10px;
  z-index: 2;
  div {
    color: white;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    width: 23px;
    height: 23px;
  }

  .idx0 {
    background: #ff5854;
  }
  .idx1 {
    background: #66ff5c;
  }

  .idx2 {
    background: #ffbc65;
  }

  .idx3 {
    background: green;
  }
  .idx4 {
    background: pink;
  }
`;

const PlaceItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  margin: 0 20px;
  /* padding: 10px 0; */
`;

const Line = styled.div`
  div {
    height: 100%;

    position: absolute;
    left: 9px;
    top: 0;
  }
  .start {
    height: 50%;
    top: 50%;
  }
  .end {
    height: 50%;
    bottom: 50%;
  }
  .end.start {
    height: 0px;
    bottom: 50%;
  }

  .idx0 {
    border-left: 2px solid #ff5854;
  }
  .idx1 {
    border-left: 2px solid #66ff5c;
  }

  .idx2 {
    border-left: 2px solid #ffbc65;
  }

  .idx3 {
    border-left: 2px solid green;
  }
  .idx4 {
    border-left: 2px solid pink;
  }
`;

const PlaceInfo = styled.div`
  display: flex;

  padding: 10px;
  .type {
    font-size: 0.8rem;
    color: #9e9e9e;
  }
`;

const PlaceListItem = ({ placeKey, place }) => {
  const dispatch = useDispatch();

  const onClickMemo = (fcDetailId, e) => {
    let content;
    let img;
    Swal.fire({
      title: '나만의 추억✨',
      input: 'textarea',
      inputPlaceholder: '메모를 입력해주세요.',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Next',
      showLoaderOnConfirm: true,
      preConfirm: (content) => {
        return content;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '사진을 올려주세요!',
          input: 'file',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (imgFile) => {
            return imgFile;
          },
        }).then((imgFile) => {
          if (imgFile.isConfirmed) {
            content = result.value;
            img = imgFile.value;
            dispatch(createDiary({ img, content, fcDetailId }));
          }
        });
      }
    });
  };


  return (
    <Wrapper>
      <p>{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return (
          <PlaceItem>
            <Line>
              <div
                className={`idx${placeKey} ${
                  index == place.length - 1 ? 'end' : ''
                } ${index == 0 ? 'start' : ''}`}
              ></div>
            </Line>
            <PlaceIdx>
              <div className={`idx${placeKey}`}>{index + 1}</div>
            </PlaceIdx>
            <PlaceInfo>
              <div>
                <p key={index}>{p.place.name}</p>
                <div className="type">{p.type}</div>
              </div>
              <button onClick={(e) => onClickMemo(p.fcdId, e)}>멤</button>
            </PlaceInfo>
          </PlaceItem>
        );
      })}
    </Wrapper>
  );
};

export default PlaceListItem;
