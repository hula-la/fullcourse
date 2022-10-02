import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDiary } from '../../../features/user/userActions';
import Swal from 'sweetalert2';

const PlaceListItem = ({ placeKey, place }) => {
  const dispatch = useDispatch();

  const onClickMemo = (fcDetailId, e) => {
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
            dispatch(createDiary({ img, content, fcDetailId }));
          }
        });
      }
    });
  };


  return (
    <div>
      <p>{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return (
          <div>
            <p key={index}>{p.place.name}</p>
            <button onClick={(e) => onClickMemo(p.fcdId, e)}>멤</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlaceListItem;
