import React from 'react';
import FullcourseMap from '../../components/share/FullcourseMap';
import FullcourseSide from '../../components/share/FullcourseSide';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchSharedFc } from '../../features/share/shareActions';

const DetailBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FullcourseDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const sharedFcId = params.sharedFcId;

  useEffect(() => {
    dispatch(fetchSharedFc(sharedFcId));
  }, [dispatch, sharedFcId]);

  return (
    <DetailBlock>
      <FullcourseSide />
      <FullcourseMap />
    </DetailBlock>
  );
};

export default FullcourseDetail;
