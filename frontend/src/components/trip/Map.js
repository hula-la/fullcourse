import React,{useEffect, useRef, useCallback} from 'react';
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

  const dispatch = useDispatch()
  const mapRef = useRef(null);
  
  const initMap = useCallback(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.1165, lng: 129.0401 },
      zoom: 11,
      styles: googleMapStyle.mapStyles
    });
    dispatch(setInitMap(map))
  }, [mapRef]);



  useEffect(() => {
    initMap();
   
  }, [initMap]);


  return <MapContainer id="map" ref={mapRef}></MapContainer>;
};

export default Map;
