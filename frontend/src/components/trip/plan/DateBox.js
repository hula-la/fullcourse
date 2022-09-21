// import React from 'react';
import DateRanger from './DateRanger';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { addDays } from 'date-fns';
//icon
import { FaCalendarAlt } from 'react-icons/fa';

import format from 'date-fns/format';

const TripDay = styled.div`
  font-family: Tmoney;
  font-size: 4vmin;
  margin-bottom: 3vh;
`;

const Calendar = styled(FaCalendarAlt)`
  font-size: 3vmin;
  color: #0aa1dd;
  margin-bottom: 3vh;
  cursor: pointer;
`;

const StyledInput = styled.input`
  background-color: white;
  border: 2px solid #d9d9d9;
  border-radius: 0.5rem;
  font-size: 2vmin;
  padding: 2vh 1vw;
  margin: 0 0.5vw;
  width: 8vw;
  height: 1vh;
  font-family: Tmoney;
  text-align: center;
  cursor: pointer;

  &:hover {
    border: 2.5px solid #00cfb4;
  }
  &:focus {
    /* border: 2.5px solid #00cfb4; */
    outline: none;
  }
`;

const TripDate = styled.div`
  display: flex;
  justify-content: center;
`;

const DateBox = () => {
  // get the target element to toggle
  const refOne = useRef(null);

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection',
    },
  ]);

  // open close
  const [open, setOpen] = useState(true);

  const [tripDay, setTripDay] = useState(1);
  useEffect(() => {
    // event listeners
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  // Hide on outside click //모달백드롭을 useRef를 사용해서 구현하는법
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }

    // string을 Date type으로 바꾸는 법(정해진 형태의 string만 가능)
    const sD = new Date(document.getElementById('startDate').value);
    const eD = new Date(document.getElementById('endDate').value);
    const res = days_between(sD, eD);
    setTripDay(res);
  };

  //일 수 세기
  function days_between(date1, date2) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;
    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);
    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY) + 1;
  }

  return (
    <div>
      <TripDay>Day {tripDay}</TripDay>
      <Calendar onClick={() => setOpen((open) => !open)} />
      <TripDate>
        <StyledInput
          value={
            range[0].startDate && `${format(range[0].startDate, 'MM/dd/yyyy')}`
          }
          readOnly
          onClick={() => setOpen((open) => !open)}
          id="startDate"
        />
        <StyledInput
          value={
            range[0].startDate && `${format(range[0].endDate, 'MM/dd/yyyy')}`
          }
          readOnly
          className="endDate"
          onClick={() => setOpen((open) => !open)}
          id="endDate"
        />
      </TripDate>

      <DateRanger
        open={open}
        refOne={refOne}
        range={range}
        setRange={setRange}
      ></DateRanger>
    </div>
  );
};

export default DateBox;
