import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDiary } from '../../../features/trip/tripActions';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import UpdateMemo from './UpdateMemo';
import { clickUpdate } from '../../../features/trip/tripSlice';

const MemoBlock = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  background-image: url('/img/memo.jpg');
  .btn-wrapper{
    display: grid;
    justify-content: center;
  }
`;

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 15%;
  margin: 10px 15px;
  align-items: center;
  justify-content: space-evenly;
  /* div {
    width: 100%;
    text-align: left;
  } */
  .day {
    font-size: 1.2rem;
  }
  .name {
    font-size: 1.5rem;
    border-bottom: 4px solid #0aa1dd;
    width: fit-content;
  }
  .visit {
    width: 100%;
    text-align: left;
    width: fit-content;
    left: 0;
    padding: 5px;
    border-radius: 1rem;
    font-size: 0.8rem;
    background-color: #fff;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    color: #0aa1dd;
  }
`;

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  padding: 0 20px;
  padding-bottom: 15px;
  border-top: 2px solid #0aa1dd;

`;

const Img = styled.div`
  height: 50%;
  margin-top: 15px;
  .img {
    height: 100%;
  }
  img {
    border-radius: 1rem;
    height: 100%;
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
    object-fit: cover;
  }
`;

const Comment = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 1rem;
  border: 3px dashed #0aa1dd;
  background-color: #fff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  padding: 1rem;
`;

const Button = styled.div`
  width: 30%;
  padding: 3px;
  background-color: #fff;
  border: 2px solid #d9efff;
  border-radius: 5rem;
  text-align: center;
  font-size: 0.9rem;
  min-width: 92px;

  cursor: pointer;
  &:hover {
    background-color: #d9efff;
    transition: 0.3s;
  }
`;

const FullcourseMemo = ({ fullcourseDetail }) => {
  const dispatch = useDispatch();
  const { showMemo } = useSelector((state) => state.user);
  const { isUpdate } = useSelector((state) => state.trip);
  const [comment, setComment] = useState(null);
  const [img, setImg] = useState(null);
  const [visited, setVisited] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [fcdId, setFcdId] = useState(null);
  // const [isUpdate, setIsUpdate] = useState(0);

  useEffect(() => {
    if (fullcourseDetail) {
      const tmp = fullcourseDetail.places[showMemo['first']][showMemo['last']];
      setComment(tmp.comment);
      setImg(tmp.img);
      setVisited(tmp.visited);
      setPlaceName(tmp.place.name);
      setFcdId(tmp.fcdId);
    }
  }, [showMemo, fullcourseDetail]);

  const onClickMemo = () => {
    let content;
    let img;
    Swal.fire({
      title: '나만의 추억✨',
      input: 'textarea',
      inputPlaceholder: '메모를 입력해주세요.',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Next',
      showLoaderOnConfirm: true,
      preConfirm: (content) => {
        return content;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '사진을 올려주세요!',
          input: 'file',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (imgFile) => {
            return imgFile;
          },
        }).then((imgFile) => {
          if (imgFile.isConfirmed) {
            content = result.value;
            img = imgFile.value;
            dispatch(
              createDiary({
                img,
                content,
                fcDetailId: fcdId,
              }),
            );
          }
        });
      }
    });
  };

  const onClickUpdate = () => {
    dispatch(clickUpdate());
  };

  return (
    <>
      {!isUpdate ? (
        <MemoBlock>
          <PlaceWrapper>

            <div className="name">{placeName}</div>
            {img || comment ? (
              <div className="btn-wrapper">
                <Button onClick={onClickUpdate}>수정하기</Button>
              </div>):null}
            {visited ? <span className="visit">방문 인증완료 </span> : null}
          </PlaceWrapper>
          {img || comment ? (
            <MemoWrapper>
              <Img>
                {img ? (
                  <div className="img">
                    <img src={img} />
                  </div>
                ) : (
                  <div className="img">
                    <img src="/img/boogie.jpg" />
                  </div>
                )}
              </Img>
              <Comment>
                {comment.length > 0 ? (
                  <div className="commnet">{comment}</div>
                ) : (
                  <div className="commnet">등록된 메모가 없습니다!</div>
                )}
              </Comment>
            </MemoWrapper>
          ) : (
            <div className="btn-wrapper">
              <Button onClick={onClickMemo}>기록하기 📚</Button>
            </div>
          )}
        </MemoBlock>
      ) : (
        <UpdateMemo />
      )}
    </>
  );
};

export default FullcourseMemo;
