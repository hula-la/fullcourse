import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { fetchTravelPlace } from '../../../features/trip/tripActions';

const PlaceContainer = styled.div`
  
`
const PlaceOverview = styled.div`
`

const PlaceList = styled.div`
  
`


const PlaceBar = () => {
  const dispatch = useDispatch()

  // const PLACE_TYPES = {
  //   travel: "travel"
  // }

 
  


  useEffect(() => {
     //아무것도 선택안하고 일정생성할때 기본 장소리스트(여행지)
    //  console.log(PLACE_TYPES['travel'])
     const PLACE_TYPES = {
      travel: "travel"
    }
    dispatch(fetchTravelPlace(PLACE_TYPES['travel']))
  },[])


  return (
    <PlaceContainer className='place-container'>
      <PlaceOverview className='place-overview'>
        <PlaceList className='place-list'></PlaceList>
      </PlaceOverview>      
    </PlaceContainer>
  );
};

export default PlaceBar;