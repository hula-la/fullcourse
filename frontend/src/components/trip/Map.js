import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setInitMap } from '../../features/trip/tripSlice';
const MapContainer = styled.div``;

const Map = ({ map, setMap, mapRef }) => {
  const { markers } = useSelector((state) => state.trip);
  useSelector((state) => state.trip);
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

  //으음 useCallback의 사용이유가 뭘까
  const initMap = useCallback(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.1165, lng: 129.0401 },
      zoom: 11,
      styles: googleMapStyle.mapStyles,
    });
    setMap(map);
    dispatch(setInitMap(map)); //이렇게 쓰일수 있는지 모르겠네
    markers &&
      markers.forEach((item, idx) => {
        const position = {
          lat: parseFloat(item.position.lat),
          lng: parseFloat(item.position.lng),
        };
        new window.google.maps.Marker({
          map,
          position: position,
        });
      });
  }, [mapRef, markers]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <MapContainer id="map" ref={mapRef}></MapContainer>;
};

export default Map;
