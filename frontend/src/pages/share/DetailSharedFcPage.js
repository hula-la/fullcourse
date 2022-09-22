import React from 'react';
import FullcourseMap from '../../components/share/FullcourseMap';
import FullcourseSide from '../../components/share/FullcourseSide';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchSharedFcDetail } from '../../features/share/shareActions';
import FullcourseComment from '../../components/share/FullcourseComment';

const DetailBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FullcourseDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const sharedFcId = params.sharedFcId;
  const { sharedFcInfo } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchSharedFcDetail(sharedFcId));
  }, [dispatch, sharedFcId]);

  return (
    <DetailBlock>
      <FullcourseSide sharedFcInfo={sharedFcInfo} />
      <FullcourseMap />
      <FullcourseComment sharedFcInfo={sharedFcInfo} />
    </DetailBlock>
  );
};

export default FullcourseDetail;
