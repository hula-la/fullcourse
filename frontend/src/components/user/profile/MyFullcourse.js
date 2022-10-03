import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFullcourse } from '../../../features/user/userActions';
import MyFullcourseShare from './MyFullcourseShare';
import styled from 'styled-components';
import MyfullcourseItem from './MyFullcourseItem';
import TitleText from './TitleText';

//carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { makeStyles, useMediaQuery } from '@material-ui/core';
import { selectFcId } from '../../../features/share/shareSlice';
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
  overflow-x: scroll;
  min-width: 138px;
`;

const DisableButton = styled.button`
  margin-bottom: 4vh;
  outline: 0;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.8rem;
  background: #e1e1e1;
  pointer-events: none;
  color: darkslategray;
  border: solid 2px #ffffff00;
`;
const Button = styled.button`
  margin-bottom: 4vh;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 2vh 0;
  }
  outline: 0;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  font-size: 0.8rem;
  background: linear-gradient(
    90deg,
    rgba(217, 239, 255, 1) 100%,
    rgba(164, 216, 255, 1) 100%
  );
  box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
  color: darkslategray;
  border: solid 2px #ffffff00;
  &:hover {
    background: #ffffff;
    color: #4b94ca;
    border-color: #4b94ca;
    transition: 0.3s;
  }
`;
const MyFullcourse = ({ userInfo }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myFullcourseList } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  const modalHeader = '공유하기';
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClick = (e, fullcourse) => {
    dispatch(
      selectFcId({ fcId: fullcourse.fcId, thumbnail: fullcourse.thumbnail }),
    );
    openModal();
  };
  // carousel 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(fetchMyFullcourse());
  }, [dispatch]);

  const onClickMakeFc = () => {
    navigate('/trip/plan');
  };

  return (
    <Wrapper>
      <TitleText content="나의 풀코스" />
      {myFullcourseList
        ? myFullcourseList.content.map((fullcourse, index) => {
            return (
              <MyFullcourseShare
                open={modalOpen}
                close={closeModal}
                header={modalHeader}
                fullcourse={fullcourse}
                key={index}
              ></MyFullcourseShare>
            );
          })
        : null}
      {myFullcourseList ? (
        myFullcourseList.content.length >= 3 ? (
          <div>
            <Slider className="slider" {...settings}>
              {myFullcourseList.content.map((fullcourse, index) => {
                return (
                  <div key={index}>
                    <MyfullcourseItem key={index} fullcourse={fullcourse} />
                    {fullcourse.shared ? (
                      <DisableButton>공유완료</DisableButton>
                    ) : new Date(fullcourse.endDate) < new Date() ? (
                      <Button onClick={(e) => onClick(e, fullcourse)}>
                        공유하기
                      </Button>
                    ) : new Date() < new Date(fullcourse.startDate) ? (
                      <DisableButton>예정</DisableButton>
                    ) : (
                      <Button>여행중</Button>
                    )}
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : myFullcourseList.content.length > 0 ? (
          <div>
            <Flex>
              {myFullcourseList.content.map((fullcourse, index) => {
                return (
                  <div>
                    <MyfullcourseItem key={index} fullcourse={fullcourse} />

                    {fullcourse.shared ? (
                      <DisableButton>공유완료</DisableButton>
                    ) : new Date(fullcourse.endDate) < new Date() ? (
                      <Button onClick={onClick}>공유하기</Button>
                    ) : new Date() < new Date(fullcourse.startDate) ? (
                      <DisableButton>예정</DisableButton>
                    ) : (
                      <Button>여행중</Button>
                    )}
                  </div>
                );
              })}
            </Flex>
          </div>
        ) : (
          <Button onClick={onClickMakeFc}>풀코스 만들러 가기</Button>
        )
      ) : null}
    </Wrapper>
  );
};

export default MyFullcourse;
