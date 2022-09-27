import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PlaceList from './PlaceList';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;

  #userInfo {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left: 2rem;
    margin-top: 1.6rem;
    font-size: small;
    /* font-weight: ; */
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #profileImg {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    margin: 0 auto;
  }

  .daynonelist {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0px;
  }

  .daylistitem {
    border: #0aa1dd 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 10px 4px;
    font-size: small;
    font-weight: bold;
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

const FullcourseSide = ({ sharedFcInfo, fullcourseDetail }) => {
  const { dayTagList } = useSelector((state) => state.share);
  return (
    <Side>
      {sharedFcInfo ? (
        <>
          <div id="userInfo">
            <div id="imgBlock">
              <img id="profileImg" src="/img/default.jpeg" alt="profileImg" />
            </div>
            <p>{sharedFcInfo.user.nickname}</p>
          </div>
        </>
      ) : null}
      <ul className="daynonelist">
        {dayTagList.map((tag, index) => {
          return (
            <li
              className={'daylistitem' + (tag.selected ? ' tag-selected' : '')}
              key={index}
              // onClick={onClickTags}
            >
              <div id={tag.tag}>{tag}</div>
            </li>
          );
        })}
      </ul>
      {fullcourseDetail ? (
        <PlaceList placeList={fullcourseDetail.places} />
      ) : null}
    </Side>
  );
};

export default FullcourseSide;
