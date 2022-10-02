import React from 'react';
import { useSelector } from 'react-redux';
import SharedFcListItem from './SharedFcListItem';
import CardComponent from '../common/CardComponent';
import styled from 'styled-components';
import './main.css';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  animation: fadeInUp 2s;
`;

const Empty = styled.div`
  margin: 21vh auto;
  font-size: 1.5rem;
`;

const SharedFcList = () => {
  const { sharedFcList } = useSelector((state) => state.share);

  return (
    <div>
      <Container>
        {sharedFcList ? (
          sharedFcList.content.length > 0 ? (
            sharedFcList.content.map((fullcourse, index) => {
              return <CardComponent key={index} fullcourse={fullcourse} />;
            })
          ) : (
            <Empty>😅 찾는 조건의 풀코스가 없습니다. 😅</Empty>
          )
        ) : null}
      </Container>
    </div>
  );
};

export default SharedFcList;
