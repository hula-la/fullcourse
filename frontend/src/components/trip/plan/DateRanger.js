import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
//모달
import CalendarModal from './CalendarModal';

//날짜setting 관련
import format from 'date-fns/format';
import { addDays } from 'date-fns';

//css
import './date-range.css';

//icon
import { FaCalendarAlt } from 'react-icons/fa';

//slice import
import {
  setStartDate,
  setEndDate,
  calcTripDay,
  setDates,
} from '../../../features/trip/tripSlice';

const TripDay = styled.div`
  font-family: Tmoney;
  font-size: 3.5vmin;
  margin-bottom: 3vh;
  color: #333333;
`;

const Calendar = styled(FaCalendarAlt)`
  font-size: 3vmin;
  color: #0aa1dd;
  margin-bottom: 3vh;
  cursor: pointer;
`;

const Bar = styled.div`
  font-size: 2vmin;
  color: #d9d9d9;
  font-weight: bold;
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

  &:hover {
    border: 2.5px solid #00cfb4;
  }
  &:focus {
    outline: none;
    cursor: pointer;
  }
`;

const TripDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateRanger = () => {
  const dispatch = useDispatch();

  //여행 일수 계산
  const [tripDay, setTripDay] = useState(3);
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

  const refOne = useRef(null);
  useEffect(() => {
    // event listeners
    document.addEventListener('click', updateDateAndToggle, true);
  }, []);

  //이거 클릭 업데이트 말고 바꿔야할거 같은데 잘 모르겠네 ㅜㅜ
  const updateDateAndToggle = (e) => {
    //모달백드롭을 useRef를 사용해서 구현하는법
    if (refOne.current && !refOne.current.contains(e.target)) {
      // setOpen(false);
    }
    const sD = new Date(document.getElementById('startDate').value);
    dispatch(setStartDate(sD));
    const eD = new Date(document.getElementById('endDate').value);
    dispatch(setEndDate(eD));

    const days = days_between(sD, eD);
    setTripDay(days);
    dispatch(calcTripDay(days)); //혹시모르니 리듀서에도 저장
    const dayRange = getDates(sD, eD);
    dispatch(setDates(dayRange));
  };

  const getDates = (startDate, endDate) => {
    const dateRange = [];
    while (startDate <= endDate) {
      const date = format(new Date(startDate), 'yyyy-MM-dd');
      dateRange.push(date);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateRange;
  };

  //일 수 세기
  function days_between(date1, date2) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / ONE_DAY) + 1;
  }

  return (
    <div>
      <TripDay className="dateContainer">Day {tripDay}</TripDay>

      <Calendar
        className="dateContainer"
        onClick={() => setOpen((open) => !open)}
      />
      <TripDate className="dateContainer">
        <StyledInput
          value={
            range[0].startDate && `${format(range[0].startDate, 'MM/dd/yyyy')}`
          }
          readOnly
          onClick={() => setOpen((open) => !open)}
          id="startDate"
        />
        <Bar>~</Bar>
        <StyledInput
          value={
            range[0].endDate && `${format(range[0].endDate, 'MM/dd/yyyy')}`
          }
          readOnly
          className="endDate"
          onClick={() => setOpen((open) => !open)}
          id="endDate"
        />
      </TripDate>

      <CalendarModal
        refOne={refOne}
        open={open}
        range={range}
        setOpen={setOpen}
        setRange={setRange}
        getDates={getDates}
        tripDay={tripDay}
      />
    </div>
  );
};

export default DateRanger;
