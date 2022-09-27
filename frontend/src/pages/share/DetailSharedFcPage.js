import React from 'react';
import FullcourseMap from '../../components/share/FullcourseMap';
import FullcourseSide from '../../components/share/FullcourseSide';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchSharedFcDetail } from '../../features/share/shareActions';
import FullcourseComment from '../../components/share/FullcourseComment';
import { fetchFullcourseDetail } from '../../features/trip/tripActions';

const DetailBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FullcourseDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { sharedFcInfo } = useSelector((state) => state.share);
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const { userInfo } = useSelector((state) => state.user);

  const sharedFcId = params.sharedFcId;
  const email = userInfo ? userInfo.email : '';

  useEffect(() => {
    dispatch(fetchSharedFcDetail({ sharedFcId, email }));
  }, [dispatch]);

  useEffect(() => {
    if (sharedFcInfo !== null) {
      dispatch(fetchFullcourseDetail(sharedFcInfo.fcId));
    }
  }, [dispatch, sharedFcInfo]);

  return (
    <DetailBlock>
      <FullcourseSide
        fullcourseDetail={fullcourseDetail}
        sharedFcInfo={sharedFcInfo}
      />
      <FullcourseMap />
      <FullcourseComment sharedFcInfo={sharedFcInfo} />
    </DetailBlock>
  );
};

export default FullcourseDetail;
