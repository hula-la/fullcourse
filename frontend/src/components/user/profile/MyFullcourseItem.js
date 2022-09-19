import React, { useState } from 'react';
import MyFullcourseShare from './MyFullcourseShare';

const MyfullcourseItem = ({ fullcourse }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalHeader = '공유하기';
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClick = () => {
    openModal();
  };

  return (
    <div>
      <MyFullcourseShare
        open={modalOpen}
        close={closeModal}
        header={modalHeader}
        fullcourse={fullcourse}
      ></MyFullcourseShare>
      <p>{fullcourse.thumbnail}</p>
      <button onClick={onClick}>공유</button>
    </div>
  );
};

export default MyfullcourseItem;
