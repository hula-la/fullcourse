import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PlaceList from '../../../components/user/fullcourse/PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../../features/share/shareSlice';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  #userInfo {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left: 2rem;
    margin-top: 1.6rem;
    font-size: small;
    /* font-weight: ; */
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #profileImg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    margin: 0 auto;
  }

  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0px;
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

const FullcourseSide = ({ days, userInfo, fullcourseDetail }) => {
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

  return (
    <Side>
      {userInfo ? (
        <>
          <div id="userInfo">
            <div id="imgBlock">
              <img id="profileImg" src="/img/default.jpeg" alt="profileImg" />
            </div>
            <p>{userInfo.nickname}</p>
          </div>
        </>
      ) : null}
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
                'daylistitem' + (checkedDay === index ? ' daytag-selected' : '')
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
    </Side>
  );
};

export default FullcourseSide;
