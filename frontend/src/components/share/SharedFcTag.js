import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SharedFcDayTagItem from './SharedFcDayTagItem';
import FullcourseTagItem from './SharedFcTagItem';

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1320px;
  margin: 0 auto;

  .ttl {
    padding: 10px;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: start;
  }

  .tag {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    border-bottom: 2px solid #d9d9d9;
  }

  .nonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0px 0px;
  }
  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Text = styled.div`
  background: url('/img/baseline.png') no-repeat;
  background-position-x: 0;
  height: 100%;
  font-family: Tmoney;
  color: #333333;
  padding: 0;
`;

const FullcourseTag = () => {
  const { tagList } = useSelector((state) => state.share);
  const { dayTagList } = useSelector((state) => state.share);

  return (
    <Wrapper>
      <Text className="ttl">풀코스 검색</Text>
      <div className="tag">
        <ul className="nonelist">
          {tagList.map((tag, index) => {
            return (
              <li key={index}>
                <FullcourseTagItem tag={tag} />
              </li>
            );
          })}
        </ul>
        <ul className="daynonelist">
          {dayTagList.map((tag, index) => {
            return (
              <li key={index}>
                <SharedFcDayTagItem tag={tag} />
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default FullcourseTag;
