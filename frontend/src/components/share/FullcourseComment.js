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

const CommentBlock = styled.div`
  width: 20%;

  .commentBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .comment {
    list-style: none;
  }

  .commentForm {
    display: flex;
    flex-direction: row;
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
        <>
          {sharedFcInfo.sharedFCComments.map((comment, index) => {
            return (
            <div className='detail'>
                    {sharedFcInfo.detail}
                  </div>

            );
          })}
        </>
      ) : null}
      <div className="commentForm">
        {sharedFcInfo ? (
          <>
            {sharedFcInfo.like ? (
              <FavoriteIcon onClick={onClickLike} />
            ) : (
              <FavoriteBorderIcon onClick={onClickLike} />
            )}
          </>
        ) : null}

        {/* <FavoriteIcon onClick={onClickLike} />
        <FavoriteBorderIcon onClick={onClickLike} /> */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            onChange={onChangeReply}
          />
          <button>등록하기</button>
        </form>
      </div>

      {sharedFcInfo ? (
        <>
          {sharedFcInfo.sharedFCComments.map((comment, index) => {
            return (  
              <div key={index} className="commentBox">
                <li className="comment">
                  <span>{comment.nickname} : </span>
                  <span>{comment.comment}</span>
                </li>
                <button onClick={() => onClickDelete(comment)}>삭제</button>
                </div>
            );
          })}
        </>
      ) : null}
    </CommentBlock>
  );
};

export default FullcourseComment;
