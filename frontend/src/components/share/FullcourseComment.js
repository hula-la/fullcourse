import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createSharedFcComment,
  dropSharedFcComment,
} from '../../features/share/shareActions';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

  return (
    <CommentBlock>
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
      <div className="commentForm">
        <FavoriteIcon />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            onChange={onChangeReply}
          />
          <button>등록하기</button>
        </form>
      </div>
    </CommentBlock>
  );
};

export default FullcourseComment;
