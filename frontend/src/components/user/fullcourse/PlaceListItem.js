import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDiary } from '../../../features/trip/tripActions';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { changeShowMemo } from '../../../features/user/userSlice';
import { moveMap } from '../../../features/share/shareSlice';

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
    z-index: 2;
    background-color: #fff;
    /* padding: 10px; */
    width: 4rem;
    text-align: center;
    margin: 0px;
    height: 1.6rem;
    border-radius: 1rem;
  }
`;

const PlaceIdx = styled.div`
  margin-right: 10px;
  z-index: 2;
  width: 10%;
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
  cursor: pointer;

  margin: 0 20px;
  /* padding: 10px 0; */
  .memo {
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    background: #e2f1fa85;
  }
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
  width: 60%;
  padding: 10px;
  .type {
    font-size: 0.8rem;
    color: #9e9e9e;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    padding-left: 2px;
    font-size: 15px;
  }
  .icon {
    padding-left: 2px;
    font-size: 15px;
    color: #0aa1dd;
  }
`;

const PlaceImg = styled.div`
  width: 30%;
  text-align: center;
  position: relative;
  .placeImg {
    min-width: 2.5rem;
    min-height: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
  .placeImgB {
    width: 7rem;
    height: 7rem;
  }
  .placeMemo {
    visibility: hidden;
    position: absolute;
    top: 4rem;
    right: 42%;
    translate: 0 -50%;
    z-index: 5;
    width: 16rem;
    margin-right: 1rem;
    border: 2px solid #0aa1dd;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 1px 2px 10px 0px rgb(0, 0, 0, 0.15);
  }
  .placeMemo.show {
    visibility: visible;
  }
  .placeMemo > div {
    border-top: 2px dashed #0aa1dd;
    padding: 1.2rem;
    font-size: 0.8rem;
  }
`;

const Button = styled.div`
  width: 30%;
  padding: 3px;
  background-color: #fff;
  border: 2px solid #d9efff;
  border-radius: 5rem;
  text-align: center;
  font-size: 0.9rem;
  min-width: 92px;

  cursor: pointer;
  &:hover {
    background-color: #d9efff;
    transition: 0.3s;
  }
`;

const PlaceListItem = ({ placeKey, place }) => {
  const dispatch = useDispatch();

  // 지도 중심 이동시키기
  const onClickPlace = (index) => {
    dispatch(
      moveMap({
        lat: place[index]['place']['lat'],
        lng: place[index]['place']['lng'],
      }),
    );
  };

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
      <p className="day">{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return (
          <PlaceItem onClick={(e) => onClickPlace(index, e)}>
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
                <p key={index}>
                  {p.place.name}
                  <span>{p.visited ? '🚩' : null}</span>
                </p>
                <div className="type">{p.type}</div>
              </div>
            </PlaceInfo>
            {p.img || p.comment ? (
              <PlaceImg>
                <img className="placeImg" src={p.img} />
              </PlaceImg>
            ) : (
              <Button onClick={(e) => onClickMemo(p.fcdId, e)}>
                기록하기 📚
              </Button>
            )}
          </PlaceItem>
        );
      })}
    </Wrapper>
  );
};

export default PlaceListItem;
