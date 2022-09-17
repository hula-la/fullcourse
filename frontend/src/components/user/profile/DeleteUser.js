import React from 'react';
import { useDispatch } from 'react-redux';
import { eraseUser } from '../../../features/user/userActions';
import { logout } from '../../../features/user/userSlice';

const DeleteUser = () => {
  const dispatch = useDispatch();

  const onClick = async () => {
    await dispatch(eraseUser());
    dispatch(logout());
  };
  return (
    <div>
      <button onClick={onClick}>회원탈퇴</button>
    </div>
  );
};

export default DeleteUser;
