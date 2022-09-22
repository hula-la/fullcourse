import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullcourseTag from '../../components/share/SharedFcTag';
import SharedFcList from '../../components/share/SharedFcList';
import { fetchSharedFc } from '../../features/share/shareActions';
// import styled from 'styled-components';

const FullcourseShare = () => {
  const dispatch = useDispatch();
  const { checkedTagList } = useSelector((state) => state.share);
  const { checkedDayTagList } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchSharedFc({ checkedTagList, checkedDayTagList }));
  }, [dispatch, checkedTagList, checkedDayTagList]);

  return (
    <div>
      <FullcourseTag />
      <SharedFcList />
    </div>
  );
};

export default FullcourseShare;
