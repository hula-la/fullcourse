import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaceList from '../../../components/user/fullcourse/PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../../features/share/shareSlice';
import styled from 'styled-components';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 30%;
  height: 92vh;
  #userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1.6rem 1rem 1rem 1rem;
    font-size: small;
    /* font-weight: ; */
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
  }

  #profileImg {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    margin: 0 auto;
    border-radius: 5rem;
  }

  #userName {
    margin-left: 0.5rem;
    width: 15%;
  }
  #fullcourseInfo {
    width: 70%;
    font-size: 1.5rem;
  }
  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0px;
  }

  .daylistitem {
    overflow-y: auto;
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
  /* border: 1px solid #333333; */
  border-radius: 1rem;
  padding: 1rem;
  height: 80%;
  margin: 0.6rem;
  box-shadow: -1px 1px 5px 1px #0000029e;
`;

const FullcourseSide = ({ days, userInfo, fullcourseDetail }) => {
  const dispatch = useDispatch();
  const { dayTagList2 } = useSelector((state) => state.share);
  const { checkedDay } = useSelector((state) => state.share);
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

  const onClickTags = (index, e) => {
    dispatch(checkDay(index));
  };

  const onClickTagsAll = (e) => {
    dispatch(checkAllDay());
  };
  return (
    <Side>
      {userInfo ? (
        <div>
          <div id="userInfo">
            <div id="imgBlock">
              <img id="profileImg" src={userInfo.imgUrl} alt="profileImg" />
            </div>
            <p id="userName">{userInfo.nickname}</p>
            <div id="fullcourseInfo">
              {startDate} → {endDate}
            </div>
          </div>
        </div>
      ) : null}
      <Plan>
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
    </Side>
  );
};

export default FullcourseSide;
