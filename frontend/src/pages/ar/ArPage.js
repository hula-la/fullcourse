import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchPlaceTravel } from '../../features/ar/arActions';

const Wrapper = styled.div`
height:calc(100vh - 80px);

body{
    margin: 0; 
    overflow: hidden;
}
`



const ArPage = () => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState('');
  const { placeTravelList } = useSelector((state) => state.ar)
  
  useEffect(() => {
    dispatch(fetchPlaceTravel())
  }, [dispatch])
  
  useEffect(() => {
    console.log("placecTravelList : "+placeTravelList);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLocation(position);
      });

  }, [placeTravelList]);

  return (
    <Wrapper>
      <a-scene
  vr-mode-ui="enabled: false"
  embedded
        arjs="sourceType: webcam; debugUIEnabled: false;">
        {location &&
          <a-text
            className="here"
            value="No markers around"
            look-at="[gps-camera]"
            scale="5 5 5"
            gps-entity-place={`latitude: ${location.coords.latitude}; longitude:${location.coords.longitude}`}
          ></a-text>
        }

        {placeTravelList && placeTravelList.content.map((data, idx) => {

          return (
            <>
              <a-text
                value={`${data.name}`}
                look-at="[gps-camera]"
                scale="5 5 5"
                gps-entity-place={`latitude: ${data.lat}; longitude:${data.lng}`} 
              ></a-text>
            </>
          )
        }
        )
        }
           
        
          <a-camera gps-camera rotation-reader> </a-camera>
          </a-scene>
    </Wrapper>
  );
};

export default ArPage;
