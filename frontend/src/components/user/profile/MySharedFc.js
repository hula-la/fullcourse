import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySharedFc } from '../../../features/share/shareActions';
import MySharedFcItem from './MySharedFcItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const MySharedFc = () => {
  const dispatch = useDispatch();
  const { mySharedFcList } = useSelector((state) => state.share);

  useEffect(() => {
    dispatch(fetchMySharedFc());
  }, [dispatch]);

  return (
    <div>
      <p>공유한 풀코스</p>
      <Wrapper>
        {mySharedFcList
          ? mySharedFcList.content.map((fullcourse, index) => {
              return <MySharedFcItem key={index} fullcourse={fullcourse} />;
            })
          : null}
      </Wrapper>
    </div>
  );
};

export default MySharedFc;
