import React from 'react';
import styled from 'styled-components';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaceItem, setMarkers } from '../../../features/trip/tripSlice';
import {AiOutlinePlusCircle} from 'react-icons/ai'

const PlaceName = styled.div``;

const PlusBtn = styled(AiOutlinePlusCircle)`
  cursor: pointer;
  font-size: 3vmin;
  color: #E36387 ;
`;



const PlaceListItem = ({place,index,map,placeType}) => {
  const dispatch = useDispatch()
  const addPlaceToPlanner = (
    placeId,
    placeName,
    placeImg,
    placeLat,
    placeLng,
    placeType,
    id,
    e,
  ) => {
    e.preventDefault();
    console.log("얘가이걸 못받음",placeType)
    let placeItemObj = new Object();
    placeItemObj.placeId = placeId;
    placeItemObj.name = placeName;
    placeItemObj.imgUrl = placeImg;
    placeItemObj.draggable = true;
    placeItemObj.lat = placeLat;
    placeItemObj.lng = placeLng;
    placeItemObj.type = `${placeType}`
    placeItemObj.id = id;

    dispatch(setPlaceItem(placeItemObj));
  };
  const addMarker = (lat, lng) => {
    const position = { lat: lat, lng: lng };
    const marker = new window.google.maps.Marker({
      map,
      position: position,
    });
    console.log(typeof marker);
    marker['position'] = position;
    dispatch(setMarkers(marker));
  };
  return (
    <div>
      <Card
        variant="outlined"
        className="place-card"
        id={place.placeId}
        row
        sx={{
          minWidth: '320px',
          gap: 2,
          '&:hover': {
            boxShadow: 'md',
            borderColor: 'neutral.outlinedHoverBorder',
          },
        }}
      >
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img src={place.imgUrl} alt="" />
        </AspectRatio>
        <Box>
          <Box sx={{ ml: 0.5 }}>
            <PlaceName>{place.name}</PlaceName>

            
         
          </Box>
            <PlusBtn
              className="plus"
              id={place.placeId}
              onClick={(e) => {
                addPlaceToPlanner(
                  place.placeId,
                  place.name,
                  place.imgUrl,
                  place.lat,
                  place.lng,
                  placeType,
                  index,
                  e,
                );
                addMarker(place.lat, place.lng, e);
              }}
            />
        </Box>
      </Card>
    </div>
  );
};

export default PlaceListItem;
