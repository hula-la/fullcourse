import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSharedFcComment,
  createSharedFcLike,
  dropSharedFcComment,
} from '../../features/share/shareActions';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const CommentBlock = styled.div`
  width: 23%;

  .detail {
    margin: 40px 10px 30px 10px;
    color: #333333;
    font-size: 20px;
  }

  .commentForm {
    margin: 30px 15px 20px 20px;

    form {
      border: 1px solid #078ec4;
      border-radius: 10px;
    }

    input {
      border: #ffffff;
      width: 13.5vw;
      border-radius: 10px;
      margin-right: 10px;
      padding: 6px 0px 6px 10px;
      font-size: 17px;

      :focus {
        outline: none;
      }
    }

    button {
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
    border-radius: 1rem;
    padding: 0.5rem;
    height: 50vh;
    margin: 1rem;
    box-shadow: -1px 1px 5px 1px #078ec4;
  }

  .commentBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 15px;
    align-items: center;

    button {
      cursor: pointer;
      border: #ffffff;
      background-color: #ffffff;
      color: #b22323;
      border-radius: 20px;
      &:hover {
        color: #f73131;
        font-weight: bold;
      }
    }
  }

  .comment {
    list-style: none;
    font-size: 15px;
    justify-content: center;
    align-items: center;
  }

  #userNickname {
    font-weight: bold;
    margin: 0px 5px;
    font-size: 15px;
  }

  .likeArea {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      cursor: pointer;
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

  .share {
    cursor: pointer;
    align-items: center;
    margin-left: 20px;
    margin-right: 5px;
  }
`;

const FullcourseComment = ({ sharedFcInfo }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const onChangeReply = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSharedFcComment({ comment, sharedFcId: sharedFcInfo.sharedFcId }),
    );
    e.target.reset();
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

  return (
    <CommentBlock>
      {sharedFcInfo ? (
        <div className="detail">{sharedFcInfo.detail}</div>
      ) : null}

      <div className="likeArea">
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
            <span onClick={onClickLike}>좋아요</span>
          </>
        ) : null}
        <ShareIcon className="share" />
        <span>공유하기</span>
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
                    <span id="userNickname">{comment.nickname} </span>
                    <span>{comment.comment}</span>
                  </li>
                  <button onClick={() => onClickDelete(comment)}>삭제</button>
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
