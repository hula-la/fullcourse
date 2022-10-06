import React from 'react';
import FullcourseMap from '../../components/share/FullcourseMap';
import FullcourseSide from '../../components/share/FullcourseSide';
import MobileDetailHeader from '../../components/share/mobile/MobileDetailHeader';
import MobileFullcourseMap from '../../components/share/mobile/MobileFullcourseMap';
import MobilePlan from '../../components/share/mobile/MobilePlan';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchSharedFcDetail } from '../../features/share/shareActions';
import FullcourseComment from '../../components/share/FullcourseComment';
import { fetchFullcourseDetail } from '../../features/trip/tripActions';

import { BrowserView, MobileView } from 'react-device-detect';

const Wrapper = styled.div`
  .detailContent {
    position: relative;
  }
`;
const DetailBlock = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;

  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
`;

const FullcourseDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sharedFcInfo } = useSelector((state) => state.share);
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const { userInfo } = useSelector((state) => state.user);

  const sharedFcId = params.sharedFcId;
  const email = userInfo ? userInfo.email : '';

  useEffect(async () => {
    const { payload } = await dispatch(
      fetchSharedFcDetail({ sharedFcId, email }),
    );
    if (payload.message !== 'success') {
      navigate('/404');
    }
  }, [dispatch]);

  useEffect(() => {
    if (sharedFcInfo !== null) {
      dispatch(fetchFullcourseDetail(sharedFcInfo.fcId));
    }
  }, [dispatch, sharedFcInfo]);

  return (
    <Wrapper>
      <BrowserView>
        <DetailBlock>
          <FullcourseSide
            fullcourseDetail={fullcourseDetail}
            sharedFcInfo={sharedFcInfo}
          />
          <FullcourseMap />
          <FullcourseComment sharedFcInfo={sharedFcInfo} />
        </DetailBlock>
      </BrowserView>
      <MobileView>
        <MobileDetailHeader sharedFcInfo={sharedFcInfo} />
        <div className="detailContent">
          <MobileFullcourseMap />
          <MobilePlan
            fullcourseDetail={fullcourseDetail}
            sharedFcInfo={sharedFcInfo}
          />
        </div>
      </MobileView>
    </Wrapper>
  );
};

export default FullcourseDetail;
