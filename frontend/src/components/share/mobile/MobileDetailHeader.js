import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeDayTagList,
} from '../../../features/share/shareSlice';
import { createSharedFcLike } from '../../../features/share/shareActions';
// import MobileComment from './MobileComment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import CommentIcon from '@mui/icons-material/Comment';
import MobileComment from './MobileComment';

import ClearIcon from '@mui/icons-material/Clear';

const Wrapper = styled.div`
  justify-content: center;

  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 15vh;

  position: relative;

  .mobileComment{
    position: absolute;
    left: 0;
    top: 0; 
    width: 100%;
    height: 100%;
  }

  .hidden{
    visibility: hidden;
  }

  .clearIconBox{
    right: 1rem;
    top:0.2rem;
    position: absolute;
    z-index: 10;
  }

  #userInfo {
    display: flex;
    flex-direction: column;
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
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 20px;
  }

  .commentIcon{
    margin-left:1rem;
    /* display: inline-block; */
  }

`;

const ShareInfo = styled.div`
  margin-left: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .favorite {
    cursor: pointer;
    color: #f73131;
    margin-left: 10px;
  }

  .favoriteborder {
    cursor: pointer;
    color: #f73131;
    margin-left: 10px;
  }

  .countArea {
    margin-top: 10px;
  }

  
`;


const SharedTitle = styled.div`
  display: flex;
  width:100%;
  text-align: left;
  padding: 1.5rem 1rem;
  align-items: center;
  justify-content: space-around;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
  }

  #userNickName {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #333333a3;
    font-weight: bold;
  }
`;

const MobileDetailHeader = ({ sharedFcInfo }) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sharedFcInfo) {
      dispatch(makeDayTagList(sharedFcInfo.day));
    }
  }, [sharedFcInfo]);

  const onClickLike = () => {
    dispatch(createSharedFcLike(sharedFcInfo.sharedFcId));
  };

  const toggleActive = (e) => {
    setIsComment((prev) => {
      return !prev;
    });
  };

  return (
    <Wrapper>
      <div className={`clearIconBox ${isComment?"":"hidden"}`}
      onClick={toggleActive}>

      <ClearIcon />
      </div>
      {sharedFcInfo ? (
        <SharedTitle>
          <div id="userInfo">
            <div id="imgBlock">
              <img
                id="profileImg"
                src={sharedFcInfo.user.imgUrl}
                alt="profileImg"
              />
            </div>
            <div id="userNickName">{sharedFcInfo.user.nickname}</div>
          </div>
          <ShareInfo>
            <div>
              <div className="title">
                {sharedFcInfo.title}
                {sharedFcInfo ? (
                  <>
                    {sharedFcInfo.like ? (
                      <FavoriteIcon
                        className="favorite"
                        onClick={onClickLike}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className="favoriteborder"
                        onClick={onClickLike}
                      />
                    )}
                  </>
                ) : null}
              </div>
              <div className="countArea">
                조회수 {sharedFcInfo.viewCnt} , 좋아요 {sharedFcInfo.likeCnt} 개
              </div>
            </div>
          </ShareInfo>
          <div className={`commentIcon ${isComment?"hidden":""}`} onClick={toggleActive}>
            <CommentIcon/>
          </div>
          <div className={`mobileComment ${isComment ? "" : "hidden"}`}>
          <MobileComment
            sharedFcInfo={sharedFcInfo}
          />

          </div>

        </SharedTitle>
      ) : null}
    </Wrapper>
  );
};

export default MobileDetailHeader;
