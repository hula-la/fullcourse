import React from 'react';
import styled from 'styled-components';

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

  .listitem {
    border: #e36387 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    cursor: pointer;
    color: #e36387;
    transition: background-color 500ms;
    &:hover {
      background-color: #e36387;
      color: #ffffff;
      font-weight: bold;
    }
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

  .tag-selected {
    z-index: 100;
    opacity: 1;
    background-color: #e36387;
    color: #ffffff;

    font-weight: bold;
    margin-right: 0px;
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

  const onClickTags = (e) => {
    console.log(e);
  };
  return (
    <Wrapper>
      <p className="ttl">풀코스 검색</p>
      <div className="tag">
        <ul className="nonelist">
          {tagList1.map((tag, index) => {
            return (
              <li
                className={'listitem' + (tag.selected ? ' tag-selected' : '')}
                key={index}
                onClick={onClickTags}
              >
                <div id={tag.tag}># {tag}</div>
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
