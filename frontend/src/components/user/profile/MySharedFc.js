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
    width: 90%;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 3vw;
`;
const Empty = styled.div`
  margin: 2vh;
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

  const onClickSharedFc = (fullcourse, e) => {
    navigate(`/fullcourse/detail/${fullcourse.sharedFcId}`);
  };

  return (
    <Wrapper>
      <TitleText content="공유한 풀코스" />
      {mySharedFcList ? (
        mySharedFcList.content.length >= 3 ? (
          <Slider className="slider" {...settings}>
            {mySharedFcList.content.map((fullcourse, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => onClickSharedFc(fullcourse, e)}
                >
                  <CardComponent fullcourse={fullcourse} />
                </div>
              );
            })}
          </Slider>
        ) : mySharedFcList.content.length > 0 ? (
          <Flex>
            {mySharedFcList.content.map((fullcourse, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => onClickSharedFc(fullcourse, e)}
                >
                  <CardComponent fullcourse={fullcourse} />
                </div>
              );
            })}
          </Flex>
        ) : (
          <Empty>🙃 공유한 풀코스가 없습니다. 🙃</Empty>
        )
      ) : null}
    </Wrapper>
  );
};

export default MySharedFc;
