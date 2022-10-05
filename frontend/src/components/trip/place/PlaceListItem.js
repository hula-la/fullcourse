import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaceItem, setMarkers } from '../../../features/trip/tripSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { display, padding } from '@mui/system';
import PlaceDetailModal from './PlaceDetailModal';
import { fetchPlaceDetail } from '../../../features/trip/tripActions';
import { AiFillHeart } from 'react-icons/ai';
import { Rating } from '@mui/material';
import { fetchTravelPlace } from '../../../features/trip/tripActions';

const PlaceName = styled.div`
  text-align: start;
  font-size: 1.9vmin;
`;

const LikeContent = styled.div`
  display: flex;
  align-items: center;
  /* font-size:1vmin; */
  .rating {
    font-size: 2.3vmin;
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    margin-right: 0.3vw;
    padding: 0;
    font-size: 2vmin;
  }
`;

const PlusBtn = styled(AiOutlinePlusCircle)`
  cursor: pointer;
  font-size: 3vmin;
  color: #e36387;
  &:hover {
    color: #ae4e69;
    font-weight: bold;
    
    
  }
`;

const DetailBtn = styled(IoIosInformationCircleOutline)`
  cursor: pointer;
  font-size: 3.2vmin;
  color: #0aa1dd;
  margin-right: 0.5vh;
  &:hover {
    color: #0b739c;
    font-weight: bold;
    
    
  }
`;

const Like = styled(AiFillHeart)`
  font-size: 2vmin;
  color: #e36387;
`;

const PlaceListItem = ({
  place,
  index,
  map,
  placeType,
  sortReq,
  pageNum,
  keyword,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const setPlaceDetail = (placeId, placeType) => {
    dispatch(fetchPlaceDetail({ placeId, placeType }));
  };
  const openDetailModal = () => {
    setOpen(!open);
  };

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
    let placeItemObj = new Object();
    placeItemObj.placeId = placeId;
    placeItemObj.name = placeName;
    placeItemObj.imgUrl = placeImg;
    placeItemObj.draggable = true;
    placeItemObj.lat = placeLat;
    placeItemObj.lng = placeLng;
    placeItemObj.type = `${placeType}`;
    placeItemObj.id = id;

    dispatch(setPlaceItem(placeItemObj));
  };
  const addMarker = (lat, lng, name) => {
    const position = { lat: lat, lng: lng };
    const marker = new window.google.maps.Marker({
      map,
      position: position,
    });
    marker['position'] = position;
    marker['placeName'] = name;
    dispatch(setMarkers(marker));
  };
  
  const [randomImgUrl, setRandomImgUrl] = useState('')
  const cultureImg = ['/img/default/culture1.png','/img/default/culture2.png','/img/default/culture3.png','/img/default/culture4.png']
  const foodImg = ['/img/default/food1.png','/img/default/food2.png','/img/default/food3.png','/img/default/food4.png']
  const hotelImg = ['/img/default/hotel1.png','/img/default/hotel2.png','/img/default/hotel3.png','/img/default/hotel4.png']
  useEffect((
  )=>{
    if (placeType==='restaurant') {
      const randomValue = foodImg[Math.floor(Math.random() * foodImg.length)];
      setRandomImgUrl(randomValue)
    }
    else if (placeType==='culture') {
      const randomValue = cultureImg[Math.floor(Math.random() * cultureImg.length)];
      setRandomImgUrl(randomValue)
    }
    else if (placeType==='hotel') {
      const randomValue = hotelImg[Math.floor(Math.random() * hotelImg.length)];
      setRandomImgUrl(randomValue)
    }
  },[place.imgUrl])

  return (
    <div>
      <Card
        // variant="outlined"
        className="place-card"
        id={place.placeId}
        row
        sx={{
          width: '18vw',
          height: '9.5vh',
          gap: 2,
          boxShadow: '1px 2px 4px 1px rgb(0 0 0 / 10%);',
          ':hover': {
            boxShadow: 'md',
            borderColor: 'neutral.outlinedHoverBorder',
            // cursor: 'pointer'
          },
          justifyContent: 'space-between',
          marginTop: '1.8vh',
          padding: '1vh',
          backgroundColor: 'white',
        }}
      >
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          {place.imgUrl!==null ? (<img src={place.imgUrl} alt="" />):(<img src={randomImgUrl} alt="" />)}
          {/* <img src={randomImgUrl} alt="" /> */}
          {/* <img src={imgUrl} alt="" /> */}
          {/* {randomImgUrl} */}
        </AspectRatio>

        <Box sx={{ width: '10vw' }}>
          <PlaceName>{place.name}</PlaceName>
          <LikeContent>
            <Like />
            <p>{place.likeCnt}</p>
            <Rating
              name="read-only"
              value={place.reviewScore}
              readOnly
              className="rating"
            />
          </LikeContent>
        </Box>
        <Box sx={{ marginTop: '6.5vh', display: 'flex', marginLeft: '1vw' }}>
          <DetailBtn
            onClick={(e) => {
              openDetailModal();
              setPlaceDetail(place.placeId, placeType);
            }}
          />
          {open ? (
            <PlaceDetailModal
              openDetailModal={openDetailModal}
              imgUrl={place.imgUrl}
              placeType={placeType}
              placeId={place.placeId}
              randomImgUrl={randomImgUrl}
            />
          ) : null}
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
              addMarker(place.lat, place.lng, place.name, e);

            }}
          />
        </Box>
      </Card>
    </div>
  );
};

export default PlaceListItem;
