import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MyFullcourseShare from './MyFullcourseShare';
import styled from 'styled-components';
// for carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Wapper = styled.div`
  margin: 0 25px;
`;

const FullCourseInfo = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 138px;
  img {
    width: 10vw;
    height: 10vw;
    max-width: 100px;
    max-height: 100px;
    border-radius: 20rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  text-align: left;
  margin: auto 10px;
  width: 70%;
  div {
    font-size: 1.5rem;
  }
  a {
    color: black;
    margin-left: 5px;
  }
`;

const MyfullcourseItem = ({ fullcourse }) => {
  const days = {
    Sun: '일',
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
  };
  const months = {
    Jan: '1',
    Feb: '2',
    Mar: '3',
    Apr: '4',
    May: '5',
    Fri: '6',
    Jun: '7',
    Aug: '8',
    Sep: '9',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  //일 수 세기
  const days_between = (date1, date2) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const differenceMs = Math.abs(date1 - date2);

    return Math.round(differenceMs / ONE_DAY) + 1;
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [DDay, setDDay] = useState(null);
  const [travelState, setTravelState] = useState(null);

  const modalHeader = '공유하기';
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClick = () => {
    openModal();
  };

  useEffect(() => {
    const today = new Date();
    const start = new Date(fullcourse.startDate);
    const end = new Date(fullcourse.endDate);
    const startSplit = start.toDateString().split(' ');
    const endSplit = end.toDateString().split(' ');

    setStartDate(
      months[startSplit[1]] +
        '.' +
        startSplit[2] +
        '(' +
        days[startSplit[0]] +
        ')',
    );
    setEndDate(
      months[endSplit[1]] + '.' + endSplit[2] + '(' + days[endSplit[0]] + ')',
    );
    let dDay;
    if (end < today) {
      // 일정 지남
      dDay = days_between(end, today);
      setDDay('D+' + dDay);
    } else if (today < start) {
      //일정 전
      dDay = days_between(start, today);
      setDDay('D-' + dDay);
    } else {
      setDDay('D-Day');
    }
  }, []);

  return (
    <Wapper>
      <FullCourseInfo>
        <img src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270" />
        <Info>
          <NavLink to={`/user/fullcourse/${fullcourse.fcId}`}>
            <div style={{ fontWeight: '500' }}>{DDay}</div>
            <span style={{ color: 'gray' }}>
              {startDate} - {endDate}
            </span>
          </NavLink>
        </Info>
      </FullCourseInfo>
    </Wapper>
  );
};

export default MyfullcourseItem;
