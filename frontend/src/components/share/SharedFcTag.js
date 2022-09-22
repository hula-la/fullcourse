import React, { useState } from 'react';
import styled from 'styled-components';
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

  .daylistitem {
    border: #0aa1dd 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    cursor: pointer;
    color: #0aa1dd;
    transition: background-color 500ms;
    &:hover {
      background-color: #0aa1dd;
      color: #ffffff;
      font-weight: bold;
    }
  }

  .daytag-selected {
    z-index: 100;
    opacity: 1;
    background-color: #0aa1dd;
    color: #ffffff;
    font-weight: bold;
    margin-right: 0px;
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
  const tagList1 = [
    '산',
    '바다',
    '힐링',
    '계곡',
    '핫플',
    '현지맛집',
    '돼지국밥',
    '산책',
    '데이트',
    '맛집',
    '힐링',
    '계곡',
    '핫플',
  ];
  const tagList2 = ['1DAY', '2DAY', '3DAY', '4DAY', '5DAY'];

  const [checkedTagList, setCheckedTagList] = useState([]);
  const [daycheckedTagList, setDayCheckedTagList] = useState([]);

  const onClickTag = (tag) => {
    if (checkedTagList.includes(tag)) {
      setCheckedTagList(checkedTagList.filter((el) => el !== tag));
    } else {
      setCheckedTagList([...checkedTagList, tag]);
    }
  };

  return (
    <Wrapper>
      <Text className="ttl">풀코스 검색</Text>
      <div className="tag">
        <ul className="nonelist">
          {tagList1.map((tag, index) => {
            return (
              <li key={index}>
                <FullcourseTagItem onClickTag={onClickTag} tag={tag} />
              </li>
            );
          })}
        </ul>
        <ul className="daynonelist">
          {tagList2.map((tag, index) => {
            return (
              <li
                className={
                  'daylistitem' + (tag.selected ? ' tag-selected' : '')
                }
                key={index}
                // onClick={onClickTags}
              >
                <div id={tag.tag}># {tag}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default FullcourseTag;
