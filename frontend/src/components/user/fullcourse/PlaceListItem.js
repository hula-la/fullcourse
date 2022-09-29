import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const PlaceListItem = ({ placeKey, place }) => {
  const onClickMemo = (e) => {
    Swal.fire({
      title: '나만의 추억★',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Next',
      showLoaderOnConfirm: true,
      preConfirm: (title) => {
        return title;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <div>
      <p>{parseInt(placeKey) + 1}Day</p>
      {place.map((p, index) => {
        return (
          <div>
            <p key={index}>{p.place.name}</p>
            <button onClick={onClickMemo}>멤</button>
          </div>
        );
      })}
    </div>
  );
};

export default PlaceListItem;
