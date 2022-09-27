import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FullcourseMap from '../../components/share/FullcourseMap';
import FullcourseSide from '../../components/user/fullcourse/FullcourseSide';
import { fetchFullcourseDetail } from '../../features/trip/tripActions';
import styled from 'styled-components';

const DetailBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DetailFullcoursePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const fcId = params.fcId;

  useEffect(() => {
    dispatch(fetchFullcourseDetail(fcId));
  }, [dispatch, fcId]);

  return (
    <DetailBlock>
      <FullcourseSide userInfo={userInfo} fullcourseDetail={fullcourseDetail} />
      <FullcourseMap />
    </DetailBlock>
  );
};

export default DetailFullcoursePage;
