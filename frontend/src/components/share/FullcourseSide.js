import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PlaceList from './PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
} from '../../features/share/shareSlice';
import { Schedule } from '@mui/icons-material';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  #userInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: center;
    
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
    margin-bottom:1rem;
    margin-top:0rem;
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


const ShareInfo = styled.div`
margin-left: 2rem;
`;

const Plan = styled.div`
    /* border: 1px solid #333333; */
    border-radius: 1rem;
    padding: 1rem;
    height: 60vh;
    margin: 0.6rem;
    box-shadow: -1px 1px 5px 1px #0000029e;
`;

const SharedTitle = styled.div`
display: flex;
text-align: left;
padding-bottom: 1.5rem;
padding:1.5rem;

.container{
  padding: 0.5em;
}
.title{
font-size: 1.1rem;
font-weight: bold;
}

.detail{
margin-top: 0.5rem;
font-size: 0.9rem;
color: #333333;
}

#userNickName{
  margin-top:0.3rem;
  font-size:0.7rem;
  color: #333333a3;
  font-weight: bold;
}
`;

const FullcourseSide = ({ sharedFcInfo, fullcourseDetail }) => {
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

  return (
    <Side>
      {sharedFcInfo ? (
        <SharedTitle>
            <div id="userInfo">
              <div id="imgBlock">
                <img id="profileImg" src="/img/default.jpeg" alt="profileImg" />
              </div>
              <div id="userNickName">{sharedFcInfo.user.nickname}</div>
            </div>

          
          <ShareInfo>
            <div className='title'>
              {sharedFcInfo.title}
            </div>
           
          </ShareInfo>
        </SharedTitle>
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
      </Plan>
    </Side>
  );
};

export default FullcourseSide;
