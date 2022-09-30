import React from 'react';
import PlaceListItem from './PlaceListItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow-y: scroll;
  padding: 0.5rem;
  height: 80%;

  .scroll {
    display: inline-block;
    width: 150px;
    height: 250px;
    padding: 20px;
    overflow-y: scroll;
    border: 1px solid black;
    box-sizing: border-box;
    color: white;
    font-family: 'Nanum Gothic';
    background-color: rgba(0, 0, 0, 0.8);
  }

  /* 스크롤바 설정*/
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    background-color: #0aa1dd;
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #d4d4d4;
  }
`;

const PlaceList = ({ placeList }) => {
  return (
    <Wrapper>
      {placeList ? (
        <>
          {Object.keys(placeList).map((placeKey, index) => {
            return (
              <PlaceListItem
                key={index}
                placeKey={placeKey}
                place={placeList[placeKey]}
              />
            );
          })}
        </>
      ) : null}
    </Wrapper>
  );
};

export default React.memo(PlaceList);
