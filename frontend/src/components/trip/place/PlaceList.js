import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlaceListItem from './PlaceListItem';

const Container = styled.div`
  border: 1px solid;
  height: 80vh;
  overflow-y: scroll;
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