import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMyFullcourse } from '../../../features/user/userActions';

const MyFullcourse = ({ userInfo }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchMyFullcourse(userInfo.email));
    dispatch(fetchMyFullcourse('1'));
  });
  return (
    <div>
      <p>나의 풀코스</p>
    </div>
  );
};

export default MyFullcourse;
