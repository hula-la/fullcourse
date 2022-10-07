import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { createDiary } from '../../../features/trip/tripActions';
import styled from 'styled-components';
import { clickUpdate } from '../../../features/trip/tripSlice';

const MemoBlock = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  background-image: url('/img/memo.jpg');
  .btn-wrapper {
    display: grid;
    justify-content: center;
    text-align: center;
  }
`;

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 15%;
  margin: 10px 15px;
  align-items: center;
  justify-content: space-evenly;
  div {
    width: 100%;
    text-align: center;
  }
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
  input[type='file'] {
    display: none;
  }
`;

const Img = styled.div`
  height: 50%;
  position: relative;
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
  label {
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  label .icon {
    border: solid 2px black;
    border-radius: 1rem;
    padding: 2px;
    background-color: black;
    color: white;
  }
`;

const Comment = styled.textarea`
  height: 14rem;
  resize: none;
  margin-top: 15px;
  border-radius: 1rem;
  border: 3px dashed #0aa1dd;
  background-color: #fff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  font-family: 'Tmoney';
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

const UpdateMemo = () => {
  const dispatch = useDispatch();
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const { showMemo } = useSelector((state) => state.user);
  const [comment, setComment] = useState(null);
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [visited, setVisited] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [fcdId, setFcdId] = useState(null);

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

  const onChangeMemo = (e) => {
    setComment(e.target.value);
  };

  const onChangeImg = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImg(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    } else {
      setImgFile(null);
    }
  };

  const onClickUpdate = () => {
    dispatch(
      createDiary({ img: imgFile, content: comment, fcDetailId: fcdId }),
    );
    setImgFile(null);
    dispatch(clickUpdate());
  };

  return (
    <MemoBlock>
      <PlaceWrapper>
        <div className="name">{placeName}</div>
        <div className="btn-wrapper">
          <Button onClick={onClickUpdate}>수정완료</Button>
        </div>
        {visited ? <span className="visit">방문 인증완료 </span> : null}
      </PlaceWrapper>
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
          <label for="file">
            <EditIcon className="icon" />
          </label>
        </Img>
        <input
          name="file"
          id="file"
          type="file"
          accept="image/*"
          onChange={onChangeImg}
        />

        <Comment onChange={onChangeMemo} value={comment}></Comment>
      </MemoWrapper>
    </MemoBlock>
  );
};

export default UpdateMemo;
