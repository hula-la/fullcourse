import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createSharedFcComment,
  createSharedFcLike,
  dropSharedFcComment,
} from '../../features/share/shareActions';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

import ClearIcon from '@mui/icons-material/Clear';

const CommentBlock = styled.div`
  display: flex;
  /* height: 100vh; */
  flex-direction: column;

  width: 30%;
  min-width: 19rem;
  background: #e2f1fa;
  .sharedFCInfo {
    text-align: left;
  }

  .detail {
    font-size: 0.9rem;
    padding: 1rem 1rem;
    color: #333333;

    background: white;
    border-radius: 1.5rem;
    margin: 0 0.8rem;
    /* font-size: 20px; */
  }

  .commentForm {
    padding: 0.7rem;
    background: white;

    display: flex;
    justify-content: space-between;

    form {
      display: flex;
      justify-content: space-between;
      border: 1px solid #078ec4;
      border-radius: 10px;
      width: 100%;
    }

    input {
      border: #ffffff;
      width: 100%;
      border-radius: 10px;
      margin-right: 10px;
      padding: 6px 0px 6px 10px;
      font-size: 0.9rem;

      :focus {
        outline: none;
      }
    }

    button {
      width: 5rem;
      cursor: pointer;
      border: #ffffff;
      background-color: #ffffff;
      padding: 3px 10px;
      color: #078ec4;
      border-radius: 20px;

      &:hover {
        color: #0abdff;
        font-weight: bold;
      }
    }
  }

  .commentArea {
    /* height: 50vh; */
    padding: 0 0.5rem;
    overflow-y: scroll;
    background: white;

    /* 스크롤바 설정*/
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* 스크롤바 막대 설정*/
    &::-webkit-scrollbar-thumb {
      background-color: #0aa1dd;
      /* 스크롤바 둥글게 설정    */
      border-radius: 10px;
    }

    /* 스크롤바 뒷 배경 설정*/
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #d4d4d4;
    }
  }

  .commentBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
    border-top: 1px solid #d4d4d4;

    /* button {
    } */

    .clearBtn {
      cursor: pointer;
      border: #ffffff;
      background-color: #ffffff;
      color: #b22323;
      border-radius: 20px;
      margin-top: 0.5rem;
      &:hover {
        color: #f73131;
        font-weight: bold;
      }
    }

    #profileImg {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 20px;
    }
  }

  .comment {
    width: 100%;
    list-style: none;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .imgNameWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .commentContentContainer {
    /* width:100%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 0.5rem 0 1rem;
    text-align: left;
  }

  .datePosition {
    position: absolute;
    right: 0px;
    font-size: small;
  }

  .commentContent {
    padding: 0.5rem;
    background: #e2f1fa;
    border-radius: 0.5rem;
    margin-top: 0.4rem;
    font-size: 0.9rem;
    position: relative;
  }

  .commentContent::after {
    content: ' ';
    position: absolute;
    border-style: solid;
    border-width: 5px;
  }

  .commentContent::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent #e2f1fa transparent transparent;
  }

  #userNickname {
    font-weight: bold;
    /* margin: 0px 7px; */
  }

  .likeArea {
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem 0;
  }

  .btnContainer {
    margin: 0 0.6rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    &:hover {
      background: #c8e8fb;
    }
  }

  .favorite {
    cursor: pointer;
    color: #f73131;
    margin-right: 5px;
  }

  .favoriteborder {
    cursor: pointer;
    color: #f73131;
    margin-right: 5px;
  }

  #btnKakaoCap {
    position: relative;
    display: inline-block;
    cursor: pointer;
    /* padding-top: 40px; */
    margin-left: 0.5rem;
    /* background-image: url(https://onsikgo.s3.ap-northeast-2.amazonaws.com/icon/icon-kakao.png);
    background-repeat: no-repeat; */
  }
`;

const DetailHeader = styled.div`
  padding: 1rem;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;

  font-size: small;
  /* font-weight: ; */

  .regDate {
    color: #333333;
    font-weight: bold;
    font-size: 0.7rem;
  }

  #profileImg {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 20px;
  }

  #userNickName {
    margin-left: 0.6rem;
    font-size: 1rem;
    color: #333333a3;
    font-weight: bold;
  }

  #userInfo {
    display: flex;
    align-items: center;
  }
  #btn-del{
    border: none;
    background: none;
    color: #8e8e8e;
  }
`;

const FullcourseComment = ({ sharedFcInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const { Kakao } = window;
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (sharedFcInfo) {
      Kakao.Link.createDefaultButton({
        container: '#btnKakao',
        objectType: 'feed',
        content: {
          title: sharedFcInfo.title,
          description: sharedFcInfo.detail,
          imageUrl: sharedFcInfo.thumbnail,
          link: {
            mobileWebUrl:
              'https://j7e106.p.ssafy.io/fullcourse/detail/' +
              sharedFcInfo.sharedFcId,
            webUrl:
              'https://j7e106.p.ssafy.io/fullcourse/detail/' +
              sharedFcInfo.sharedFcId,
          },
        },
      });
    }
  }, [sharedFcInfo]);

  const onChangeReply = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/user/login');
    } else {
      dispatch(
        createSharedFcComment({ comment, sharedFcId: sharedFcInfo.sharedFcId }),
      );
      e.target.reset();
    }
  };

  const onClickDelete = (comment) => {
    dispatch(
      dropSharedFcComment({
        sharedFcId: sharedFcInfo.sharedFcId,
        commentId: comment.commentId,
      }),
    );
  };

  const onClickLike = () => {
    dispatch(createSharedFcLike(sharedFcInfo.sharedFcId));
  };

  const shareKakao = (sharedFcInfo) => {
    console.log('들어온다');
  };

  return (
    <CommentBlock>
      {sharedFcInfo ? (
        <div className="sharedFCInfo">
          <DetailHeader>
            <div id="userInfo">
              <img
                id="profileImg"
                src={sharedFcInfo.user.imgUrl}
                alt="profileImg"
              />
              <div id="userNickName">{sharedFcInfo.user.nickname}</div>
            </div>
            <div className="regDate">{sharedFcInfo.regDate.slice(0, 10)}</div>
            <div>
              <button className="btn-del">삭제</button>
            </div>
            
          </DetailHeader>

          <div className="detail">{sharedFcInfo.detail}</div>
        </div>
      ) : null}
      <div className="likeArea">
        <div className="btnContainer" onClick={onClickLike}>
          {sharedFcInfo ? (
            <>
              {sharedFcInfo.like ? (
                <FavoriteIcon className="favorite" />
              ) : (
                <FavoriteBorderIcon className="favoriteborder" />
              )}
              <span>좋아요</span>
            </>
          ) : null}
        </div>
        <div
          id="btnKakao"
          className="btnContainer"
          // onClick={() => {
          //   shareKakao(sharedFcInfo);
          // }}
        >
          {sharedFcInfo ? <ShareIcon /> : null}
          <span id="btnKakaoCap">공유하기</span>
        </div>
      </div>
      <div className="commentForm">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="댓글 달기.."
            onChange={onChangeReply}
          />
          <button>게시</button>
        </form>
      </div>
      <div className="commentArea">
        {sharedFcInfo ? (
          <>
            {sharedFcInfo.sharedFCComments.map((comment, index) => {
              return (
                <div key={index} className="commentBox">
                  <li className="comment">
                    <div className="imgNameWrapper">
                      <img
                        id="profileImg"
                        src={comment.imgUrl}
                        alt="profileImg"
                      />
                      <div className="commentContentContainer">
                        <div>
                          <span id="userNickname">{comment.nickname}</span>
                          <span className="datePosition">
                            {' '}
                            {comment.regDate.substr(0, 10)}
                          </span>
                        </div>
                        <span className="commentContent">
                          {comment.comment}
                        </span>
                      </div>
                    </div>
                    {userInfo && userInfo.email === comment.email ? (
                      <div className="clearBtn">
                        <ClearIcon onClick={() => onClickDelete(comment)} />
                      </div>
                    ) : null}
                  </li>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </CommentBlock>
  );
};

export default FullcourseComment;
