import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySharedFc } from '../../../features/share/shareActions';
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
    margin: 2vw;
  padding: 0 4vw;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 3px 3px 5px 3px #00000038;
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

const MySharedFc = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mySharedFcList } = useSelector((state) => state.share);
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
    dispatch(fetchMySharedFc());
  }, [dispatch]);
  useEffect(() => {
    if (mySharedFcList) {
      setFcLength(mySharedFcList.length);
    }
  }, [mySharedFcList]);
  const onClickSharedFc = (fullcourse, e) => {
    navigate(`/fullcourse/detail/${fullcourse.sharedFcId}`);
  };

  return (
    <Wrapper>
      <TitleText content="공유한 풀코스" />

      {mySharedFcList && mySharedFcList.length > 0 ? (
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
          {mySharedFcList.map((fullcourse, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={(e) => onClickSharedFc(fullcourse, e)}
              >
                <CardComponent fullcourse={fullcourse} />
              </div>
            );
          })}
        </Slider>
      ) : (
        <Empty>🙃 공유한 풀코스가 없습니다. 🙃</Empty>
      )}
    </Wrapper>
  );
};

export default MySharedFc;
