import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaceListItem from './PlaceListItem';

const Container = styled.div`
  margin-top: 1vh;
  height: 62vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Empty = styled.div`
  margin: 21vh auto;
  font-size: 1.2rem;
`;

const PlaceList = ({ map, placeType, keyword }) => {
  const { travelPlaceList } = useSelector((state) => state.trip);
  return (
    <Container>
      {travelPlaceList ? (
        travelPlaceList.content.length > 0 ? (
          travelPlaceList.content.map((place, index) => {
            return (
              <PlaceListItem
                key={index}
                place={place}
                index={index}
                map={map}
                placeType={placeType}
                keyword={keyword}
              />
            );
          })
        ) : (
          <Empty>😅 찾는 조건의 장소가 없습니다. 😅</Empty>
        )
      ) : null}

      {/* {travelPlaceList
        ? travelPlaceList.content.map((place, index) => {
            return (
              <PlaceListItem
                key={index}
                place={place}
                index={index}
                map={map}
                placeType={placeType}
              />
            );
          })
        : null} */}
    </Container>
  );
};

export default PlaceList;
