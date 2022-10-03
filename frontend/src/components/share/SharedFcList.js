import React from 'react';
import { useSelector } from 'react-redux';
import SharedFcListItem from './SharedFcListItem';
import CardComponent from '../common/CardComponent';
import styled from 'styled-components';
import './main.css';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  padding-left: 2vw;
  animation: fadeInUp 2s;
`;

const Empty = styled.div`
  margin: 21vh auto;
  font-size: 1.5rem;
`;

const SharedFcList = () => {
  const { sharedFcList } = useSelector((state) => state.share);
  const navigate = useNavigate();

  const onClick = (e, sharedFcId) => {
    navigate(`/fullcourse/detail/${sharedFcId}/`);
  };

  return (
    <div>
      <Container>
        {sharedFcList ? (
          sharedFcList.content.length > 0 ? (
            sharedFcList.content.map((fullcourse, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => onClick(e, fullcourse.sharedFcId)}
                >
                  <CardComponent fullcourse={fullcourse} />
                </div>
              );
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
