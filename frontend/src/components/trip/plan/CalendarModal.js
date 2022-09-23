import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';

//react-date-range 라이브러리 관련
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko'; //달력 한글 포맷
import format from 'date-fns/format';

//import slice
import { setDates } from '../../../features/trip/tripSlice';

const Modalbackdrop = styled.div`
  width: 10vw;
  z-index: 4;
  position: fixed; //백드롭이 제대로 먹을려면 zindex랑 position 을 먹여야함
`;

const ModalView = styled.div`
  border: 1px dashed #0aa1dd;
  border-radius: 0.5rem;
  margin-top: 1vh;
  margin-left: 1.5vw;
  padding: 0.5vh 0.5vh 0.5vh 0.5vh;

  width: 41vw;
  display: flex;
  flex-direction: column;
  .Btns {
    margin: 1vh 0 0.5vh 0;
    display: flex;
    justify-content: end;
  }
`;

const CloseBtn = styled.button`
  background-color: #a4d8ff;
  border: 0;
  width: 4vw;
  height: 4vh;

  border-radius: 0.5rem;
  margin-right: 1vh;
  font-family: Tmoney;
  font-size: 1.8vmin;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #8fbcde;
    color: #4e4e4e;
  }
`;

const OkBtn = styled.button`
  background-color: #a4d8ff;
  border: 0;
  width: 6vw;
  height: 4vh;
  border-radius: 0.5rem;
  font-family: Tmoney;
  font-size: 1.8vmin;
  color: #333333;
  cursor: pointer;
  &:hover {
    background-color: #8fbcde;
    color: #4e4e4e;
  }
`;

const CalendarModal = ({ refOne, open, range, setOpen, setRange }) => {
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector((state) => state.trip);

  //날짜 일수 범위계산
  const dateRange = [];
  const getDates = () => {
    while (startDate <= endDate) {
      const date = format(new Date(startDate), 'yyyy-MM-dd');
      // const formattedDate = convertDateFormat(date);
      dateRange.push(date);
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log('range담기냐고~', dateRange);
    dispatch(setDates(dateRange));
  };



  return (
    <Modalbackdrop ref={refOne}>
      {open && (
        <ModalView>
          <DateRange
            locale={ko}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={['#0AA1DD']}
            months={2}
            direction="horizontal"
            minDate={new Date()}
            className="DateRange"
          />
          <div className="Btns">
            <CloseBtn onClick={() => setOpen((open) => !open)}>닫기</CloseBtn>
            <OkBtn
              onClick={() => {
                setOpen((open) => !open);
                getDates();
              }}
            >
              적용하기
            </OkBtn>
          </div>
        </ModalView>
      )}
    </Modalbackdrop>
  );
};

export default CalendarModal;
