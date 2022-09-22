import React from 'react';
import { useSelector } from 'react-redux';
import SharedFcListItem from './SharedFcListItem';
import styled from 'styled-components';
import './main.css';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 60%;
  margin: 0 auto;
  animation: fadeInUp 2s;
`;

const SharedFcList = () => {
  const { sharedFcList } = useSelector((state) => state.share);

  return (
    <div>
      <Container>
        {sharedFcList
          ? sharedFcList.map((fullcourse, index) => {
              return <SharedFcListItem key={index} fullcourse={fullcourse} />;
            })
          : null}
      </Container>
    </div>
  );
};

export default SharedFcList;
