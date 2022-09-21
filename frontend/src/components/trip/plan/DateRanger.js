import React from 'react';
import styled from 'styled-components';
//react-date-range 라이브러리 관련
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko'; //달력 한글 포맷

//css
import './date-range.css';

const CalendarModal = styled.div`
  width: 10vw;
  z-index: 4;
`;

const DateRanger = ({ open, refOne, range, setRange }) => {
  return (
    <CalendarModal ref={refOne}>
      {open && (
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
      )}
    </CalendarModal>
  );
};

export default DateRanger;
