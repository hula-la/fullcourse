import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PlaceList from './PlaceList';
import {
  checkAllDay,
  checkDay,
  makeDayTagList,
  resetError,
} from '../../features/share/shareSlice';
import { createSharedFcLike } from '../../features/share/shareActions';
import { Schedule } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Swal from 'sweetalert2';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 19rem;
  background-color: #e2f1fa;

  /* 
  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  } */

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

const ShareInfo = styled.div`
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 6px solid #0aa1dd;

  .favorite {
    cursor: pointer;
    color: #f73131;
    margin-left: 10px;
  }

  .favoriteborder {
    cursor: pointer;
    color: #f73131;
    margin-left: 10px;
    /* margin: 0 10px; */
  }

  .countArea {
    margin-top: 10px;
    font-size: 0.8rem;
  }
`;

const Plan = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  margin: 0.6rem;
  box-shadow: -1px 1px 5px 1px #0000029e;
  background: white;
`;

const SharedTitle = styled.div`
  /* display: flex; */
  text-align: left;
  padding: 1.5rem 1rem;
  margin-left: 10px;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const FullcourseSide = ({ sharedFcInfo, fullcourseDetail }) => {
  const dispatch = useDispatch();
  const { dayTagList2 } = useSelector((state) => state.share);
  const { checkedDay } = useSelector((state) => state.share);
  const { errorCode } = useSelector((state) => state.share);
  const { errorMessage } = useSelector((state) => state.share);

  useEffect(() => {
    if (errorCode) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        footer: '<a href="/user/login">로그인 하러가기</a>',
      });
      dispatch(resetError());
    }
  }, [errorCode]);

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

  const onClickLike = () => {
    dispatch(createSharedFcLike(sharedFcInfo.sharedFcId));
  };

  return (
    <Side>
      {sharedFcInfo ? (
        <SharedTitle>
          <ShareInfo>
            <div>
              <div className="title">{sharedFcInfo.title}</div>
              <div className="countArea">
                조회수 {sharedFcInfo.viewCnt} , 좋아요 {sharedFcInfo.likeCnt} 개
              </div>
            </div>
            <div>
              {sharedFcInfo ? (
                <>
                  {sharedFcInfo.like ? (
                    <FavoriteIcon className="favorite" onClick={onClickLike} />
                  ) : (
                    <FavoriteBorderIcon
                      className="favoriteborder"
                      onClick={onClickLike}
                    />
                  )}
                </>
              ) : null}
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
