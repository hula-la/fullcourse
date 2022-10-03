import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PlaceList from '../PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../../features/share/shareSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .activeDiv {
    background: #fffef4;
    position: absolute;
    z-index: 3;
    width: 100%;
    box-sizing: border-box;
  }

  @keyframes slideUp {
    from {
      top: 30vh;
      height: calc(55vh - 80px);
    }
    to {
      top: 0;
      height: calc(85vh - 80px);
    }
  }
  @keyframes slideDown {
    from {
      top: 0;
      height: calc(85vh - 80px);
    }
    to {
      top: 30vh;
      height: calc(55vh - 80px);
    }
  }

  .maxPlan {
    top: 0;
    animation: slideUp;
    animation-duration: 1s;
    /* background: #fffef4; */
    height: calc(85vh - 80px);
  }
  .minPlan {
    top: 30vh;
    animation: slideDown;
    animation-duration: 1s;
    height: calc(55vh - 80px);
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
    z-index: 100;
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

const MobilePlan = ({ sharedFcInfo, fullcourseDetail }) => {
  const [ismapreduce, setIsmapreduce] = useState(false);
  const dispatch = useDispatch();
  const { dayTagList2 } = useSelector((state) => state.share);
  const { checkedDay } = useSelector((state) => state.share);

  useEffect(() => {
    if (sharedFcInfo) {
      dispatch(makeDayTagList(sharedFcInfo.day));
    }
  }, [sharedFcInfo]);

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
            <PlaceList placeList={fullcourseDetail.places} />
          ) : null}
        </Plan>
      </div>
    </Side>
  );
};

export default MobilePlan;
