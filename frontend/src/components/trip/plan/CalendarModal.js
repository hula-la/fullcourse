import React from 'react';
import styled from 'styled-components';

//react-date-range 라이브러리 관련
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko'; //달력 한글 포맷

const Modalbackdrop = styled.div`
  width: 10vw;
  z-index: 4;
  position: fixed; //백드롭이 제대로 먹을려면 zindex랑 position 을 먹여야함
`;

const ModalView = styled.div`
  border: 1px dashed black;
  border-radius: 0.5rem;
  width: 42vw;
  display: flex;
  flex-direction: column;
  

  
`

const CalendarModal = ({ refOne, open, range, setRange }) => {
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
          메롱
        </ModalView>
      )}

      {/* {open && (
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
        )} */}
    </Modalbackdrop>
  );
};

export default CalendarModal;
