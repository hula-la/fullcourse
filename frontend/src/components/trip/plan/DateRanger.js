import React, { useEffect, useState, useRef } from 'react';

//react-date-range 라이브러리 관련
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ko from 'date-fns/locale/ko'; //달력 한글 포맷
import format from 'date-fns/format';
import { addDays } from 'date-fns';

//css
import './date-range.css';

const DateRanger = () => {
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
  };

  return (
    <div>
      <input
        value={
          range[0].startDate &&
          `${format(range[0].startDate, 'MM/dd/yyyy')} to ${format(
            range[0].endDate,
            'MM/dd/yyyy',
          )}`
        }
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
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
          />
        )}
      </div>
    </div>
  );
};

export default DateRanger;
