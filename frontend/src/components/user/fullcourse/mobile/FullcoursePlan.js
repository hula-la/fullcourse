import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobilePlaceList from './MobilePlaceList';

import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../../../features/share/shareSlice';
import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background: white;

  .activeDiv {
    background: white;
    position: absolute;
    z-index: 3;
    width: 100%;
    box-sizing: border-box;
  }

  @keyframes slideUp {
    from {
      top: 30vh;
      height: 55vh;
    }
    to {
      top: 0;
      height: 85vh;
    }
  }
  @keyframes slideDown {
    from {
      top: 0;
      height: 85vh;
    }
    to {
      top: 30vh;
      height: 55vh;
    }
  }

  .maxPlan {
    top: 0;
    animation: slideUp;
    animation-duration: 1s;
    /* background: #fffef4; */
    height: 85vh;
  }
  .minPlan {
    top: 30vh;
    animation: slideDown;
    animation-duration: 1s;
    height: 55vh;
  }

  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0px;
    margin-bottom: 1rem;
    margin-top: 0rem;
  }

  .daylistitem {
    border: #0aa1dd 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    font-size: small;
    font-weight: bold;
    cursor: pointer;
    color: #0aa1dd;
    transition: background-color 500ms;
    &:hover {
      background-color: #0aa1dd;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .daytag-selected {
    z-index: 3;
    opacity: 1;
    background-color: #0aa1dd;
    color: #ffffff;
    font-size: small;
    font-weight: bold;
  }
`;
const Plan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 1rem;
  padding: 1rem;
  box-shadow: -1px 1px 5px 1px #0000029e;
  height: 100%;
  box-sizing: border-box;

  KeyboardArrowUpIcon {
    width: 2rem;
  }
`;

const FullcoursePlan = ({ days, fullcourseDetail }) => {
  const [ismapreduce, setIsmapreduce] = useState(false);

  const dispatch = useDispatch();
  const { dayTagList2 } = useSelector((state) => state.share);
  const { checkedDay } = useSelector((state) => state.share);


  useEffect(() => {
    dispatch(makeDayTagList(days));
  }, [days]);

  const onClickTags = (index, e) => {
    dispatch(checkDay(index));
  };

  const onClickTagsAll = (e) => {
    dispatch(checkAllDay());
  };
  const toggleActive = (e) => {
    setIsmapreduce((prev) => {
      return !prev;
    });
  };
  return (
    <Side>
      <div className={`activeDiv ${ismapreduce ? ' maxPlan' : ' minPlan'}`}>
        <Plan>
          {!ismapreduce ? (
            <KeyboardArrowUpIcon onClick={toggleActive} />
          ) : (
            <KeyboardArrowDownIcon onClick={toggleActive} />
          )}
          <ul className="daynonelist">
            <li
              className={
                'daylistitem' + (checkedDay === 6 ? ' daytag-selected' : '')
              }
              onClick={onClickTagsAll}
            >
              <div>All</div>
            </li>
            {dayTagList2.map((tag, index) => {
              return (
                <li
                  className={
                    'daylistitem' +
                    (checkedDay === index ? ' daytag-selected' : '')
                  }
                  key={index}
                  onClick={(e) => onClickTags(index, e)}
                >
                  <div id={tag.tag}>{tag}</div>
                </li>
              );
            })}
          </ul>
          {fullcourseDetail ? (
            <MobilePlaceList placeList={fullcourseDetail.places} />
          ) : null}
        </Plan>
      </div>
    </Side>
  );
};

export default FullcoursePlan;
