import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaceListItem from './PlaceListItem';

const Container = styled.div`
  margin-top: 1vh;
  height: 75vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2vh;
  padding-bottom: 1vh;
`;


const PlaceList = ({map, placeType}) => {
  const { travelPlaceList } = useSelector((state) => state.trip);
  return (
    <Container>
        {travelPlaceList
          ? travelPlaceList.content.map((place, index) => {
              return <PlaceListItem key={index} place={place} index={index} map={map} placeType={placeType}/>;
            })
          : null}
    </Container>
  );
};

export default PlaceList;