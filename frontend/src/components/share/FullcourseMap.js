/* global kakao */
import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapBlock = styled.div`
  width: 80%;
  height: 85vh;
  #map {
    width: 100%;
    height: 100%;
  }
`;

const FullcourseMap = () => {
  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <MapBlock>
      <div id="map"></div>
    </MapBlock>
  );
};

export default FullcourseMap;
