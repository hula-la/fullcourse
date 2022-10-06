import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchPlaceTravel } from '../../features/ar/arActions';

const Wrapper = styled.div`
  /* height:100vh; */
  /* width:100vw; */
  height: 100vh;
  width: 100vw;

  body {
    margin: 0;
    overflow: hidden;
  }
  a-camera {
    object-fit: cover;
  }
`;

const ArPage = () => {
  window.onload = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      document
        .getElementById('hereLocation')
        .setAttribute(
          'gps-entity-place',
          `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`,
        );
      console.log(
        document
          .getElementById('hereLocation')
          .getAttribute('gps-entity-place'),
      );
    });
  };

  const dispatch = useDispatch();
  const { placeTravelList } = useSelector((state) => state.ar);

  useEffect(() => {
    dispatch(fetchPlaceTravel());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("placecTravelList : "+placeTravelList);
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position);
  //     setLocation(position);
  //   });

  //   console.log(document.querySelector('a-text').getAttribute('gps-entity-place'));

  // }, [placeTravelList]);

  return (
    <Wrapper>
      <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-text
          id="hereLocation"
          className="here"
          value="No markers around"
          look-at="[gps-camera]"
          scale="5 5 5"
          gps-entity-place={`latitude: 1; longitude:1`}
        ></a-text>

        {placeTravelList &&
          placeTravelList.content.map((data, idx) => {
            return (
              <>
                <a-text
                  value={`${data.name}`}
                  look-at="[gps-camera]"
                  scale="5 5 5"
                  gps-entity-place={`latitude: ${data.lat}; longitude:${data.lng}`}
                ></a-text>
              </>
            );
          })}

        <a-camera gps-camera rotation-reader>
          {' '}
        </a-camera>
      </a-scene>
    </Wrapper>
  );
};

export default ArPage;
