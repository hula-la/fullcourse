import React from 'react';
import styled from 'styled-components';

//react-date-range 라이브러리 관련
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko'; //달력 한글 포맷

import Swal from 'sweetalert2';
import { setStartDate, setEndDate } from '../../../features/trip/tripSlice';

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
  background: #e8f9fd;
  width: 41vw;
  display: flex;
  flex-direction: column;
  .Btns {
    margin: 1vh 0 0.5vh 0;
    display: flex;
    justify-content: end;
  }
`;

//일단 닫기버튼 삭제
// const CloseBtn = styled.button`
//   background-color: #a4d8ff;
//   border: 0;
//   width: 4vw;
//   height: 4vh;

//   border-radius: 0.5rem;
//   margin-right: 1vh;
//   font-family: Tmoney;
//   font-size: 1.8vmin;
//   color: #333333;
//   cursor: pointer;
//   &:hover {
//     background-color: #8fbcde;
//     color: #4e4e4e;
//   }
// `;

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

const AlertText = styled.div`
  margin-right: 28vw;
  font-size: 2vmin;
  line-height: 4vh;
  color: #4e4e4e;
`;

const CalendarModal = ({ refOne, open, range, setOpen, setRange, tripDay }) => {
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
            // maxDate={maxDate}
            className="DateRange"
          />
          <div className="Btns">
            <AlertText>최대 일정 : 5일</AlertText>
            {/* 날짜 수정 닫기누르면 유지되게 리팩 필요 */}
            {/* <CloseBtn onClick={() => setOpen((open) => !open)}>닫기</CloseBtn> */}
            <OkBtn
              onClick={() => {
                if (tripDay > 5) {
                  Swal.fire({
                    imageUrl: '/img/boogie2.png',
                    imageHeight: 300,
                    imageAlt: 'A tall image',
                    text: '최대 일정은 5일까지 짤 수 있어요😂',
                    // text: '부기와 함께 떠나볼까요?',
                    height: 300,
                  });
                } else {
                  setOpen((open) => !open);
                  setStartDate(range[0].startDate);
                  setEndDate(range[0].endDate);
                }
              }}
            >
              적용하기
            </OkBtn>
            {/* {range[0].startDate} */}
          </div>
        </ModalView>
      )}
    </Modalbackdrop>
  );
};

export default CalendarModal;
