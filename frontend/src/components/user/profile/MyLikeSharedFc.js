import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharedFcLikeList } from '../../../features/share/shareActions';
import MyLikeSharedFcItem from './MyLikeSharedFcItem';

const MyLikeSharedFc = () => {
  const dispatch = useDispatch();
  const { sharedFcLikeList } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchSharedFcLikeList());
  }, [dispatch]);

  return (
    <div>
      <p>찜한 풀코스</p>
      {sharedFcLikeList
        ? sharedFcLikeList.content.map((fullcourse, index) => {
            return <MyLikeSharedFcItem key={index} fullcourse={fullcourse} />;
          })
        : null}
    </div>
  );
};

export default MyLikeSharedFc;
