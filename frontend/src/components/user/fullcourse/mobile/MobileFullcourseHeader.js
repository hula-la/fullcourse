import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  makeDayTagList,
} from '../../../../features/share/shareSlice';
import styled from 'styled-components';

const Side = styled.div`
  background:#e2f1fa;
  justify-content: center;

  box-shadow: 1px 1px 4px 1px #686868;
  z-index: 5;

  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 15vh;

  position: relative;

  #fullcourseInfo {
    display: flex;
    margin-right:0.5rem;
    padding: 0 0.5rem 0rem 0.5rem;
    font-size: 1.5rem;
    border-bottom: 4px solid #0aa1dd;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
  #info-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: 22%;

    align-items: center;
  }
`;

const MobileFullcourseHeader = ({ days, fullcourseDetail }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (fullcourseDetail) {
      const start = new Date(fullcourseDetail.startDate);
      const end = new Date(fullcourseDetail.endDate);
      const startSplit = start.toDateString().split(' ');
      const endSplit = end.toDateString().split(' ');
      const months = {
        Jan: '1',
        Feb: '2',
        Mar: '3',
        Apr: '4',
        May: '5',
        Jun: '6',
        Jul: '7',
        Aug: '8',
        Sep: '9',
        Oct: '10',
        Nov: '11',
        Dec: '12',
      };
      setStartDate(months[startSplit[1]] + '.' + startSplit[2]);
      setEndDate(months[endSplit[1]] + '.' + endSplit[2]);
    }
  }, [fullcourseDetail]);

  useEffect(() => {
    dispatch(makeDayTagList(days));
  }, [days]);

  return (
    <Side>
      {fullcourseDetail ? (
        <div id="info-wrapper">
          📝
          <div id="fullcourseInfo">
            {startDate} → {endDate}
          </div>
          <div>의 일정 📝</div>
        </div>
      ) : null}
    </Side>
  );
};

export default MobileFullcourseHeader;
