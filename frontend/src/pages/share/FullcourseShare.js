import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FullcourseTag from '../../components/share/FullcourseTag';
import { fetchSharedFc } from '../../features/share/shareActions';
// import styled from 'styled-components';

const FullcourseShare = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSharedFc());
  }, [dispatch]);
  return (
    <div>
      <FullcourseTag />
    </div>
  );
};

export default FullcourseShare;
