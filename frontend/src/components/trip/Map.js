import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setInitMap } from '../../features/trip/tripSlice';
const MapContainer = styled.div``;

const Map = () => {
  const googleMapStyle = {
    mapStyles: [
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
  };

  const dispatch = useDispatch();
  const mapRef = useRef(null);

  //으음 useCallback의 사용이유가 뭘까
  const initMap = useCallback(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.1165, lng: 129.0401 },
      zoom: 11,
      styles: googleMapStyle.mapStyles,
    });
    dispatch(setInitMap(map));//이렇게 쓰일수 있는지 모르겠네
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <MapContainer id="map" ref={mapRef}></MapContainer>;
};

export default Map;
