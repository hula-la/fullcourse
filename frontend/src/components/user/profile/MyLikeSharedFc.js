import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharedFcLikeList } from '../../../features/share/shareActions';
import styled from 'styled-components';
import CardComponent from '../../common/CardComponent';
import TitleText from './TitleText';

//carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Wrapper = styled.div`
  margin: 0 5vw;
  .slick-prev:before,
  .slick-next:before {
    color: #a4d8ff;
  }
  p {
    text-align: left;
    font-family: Tmoney;
    font-size: 30px;
  }
  .slider {
    margin: 1vw auto;
    width: 100%;
  }
  .slider-small {
    margin: 1vw auto;
    width: 70%;
  }
  .card {
    width: auto !important;
  }
`;

const Empty = styled.div`
  margin: 30px 0;
  font-size: 1.5rem;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    font-size: 1rem;
  }
`;

const MyLikeSharedFc = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sharedFcLikeList } = useSelector((state) => state.share);

  const [fcLength, setFcLength] = useState();
  // carousel 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(fetchSharedFcLikeList());
  }, [dispatch]);

  useEffect(() => {
    if (sharedFcLikeList) {
      setFcLength(sharedFcLikeList.content.length);
    }
  }, [sharedFcLikeList]);

  const onClickLikeSharedFc = (fullcourse, e) => {
    navigate(`/fullcourse/detail/${fullcourse.sharedFcId}`);
  };

  return (
    <Wrapper>
      <TitleText content="찜한 풀코스" />
      {sharedFcLikeList ? (
        <Slider
          className={!isMobile && fcLength < 3 ? 'slider-small' : 'slider'}
          {...{
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: isMobile ? 1 : fcLength < 3 ? fcLength : 3,
            slidesToScroll: 1,
          }}
        >
          {sharedFcLikeList.content.map((fullcourse, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={(e) => onClickLikeSharedFc(fullcourse, e)}
              >
                <CardComponent fullcourse={fullcourse} />
              </div>
            );
          })}
        </Slider>
      ) : (
        <Empty>💘 찜한 풀코스가 없습니다. 💘</Empty>
      )}
    </Wrapper>
  );
};

export default MyLikeSharedFc;
