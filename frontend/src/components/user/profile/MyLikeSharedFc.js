import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharedFcLikeList } from '../../../features/share/shareActions';

const MyLikeSharedFc = () => {
  const dispatch = useDispatch();
  const { sharedFcLikeList } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchSharedFcLikeList());
  }, [dispatch]);

  return (
    <div>
      <p>찜한 풀코스 목록</p>
    </div>
  );
};

export default MyLikeSharedFc;
