/* global kakao */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';

const MapBlock = styled.div`
  width: 70%;
  height: 85vh;
  #map {
    width: 100%;
    height: 100%;
  }
`;

const FullcourseMap = () => {
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const { checkedDay } = useSelector((state) => state.share);
  const [markerList, setMarkerList] = useState([]);
  const [linePath, setLinePath] = useState([]);

  useEffect(() => {
    if (fullcourseDetail) {
      let newMarkerList = [];
      Object.keys(fullcourseDetail.places).map((place, index) => {
        const tmp = fullcourseDetail.places[place].map((pla, index) => {
          return {
            title: pla.place.name,
            latlng: new kakao.maps.LatLng(pla.place.lat, pla.place.lng),
          };
        });
        newMarkerList = [...newMarkerList, tmp];
      });
      setMarkerList(newMarkerList);
    } else {
    }
  }, [fullcourseDetail]);

  useEffect(() => {
    if (fullcourseDetail) {
      let newLinePath = [];
      Object.keys(fullcourseDetail.places).map((place, index) => {
        const tmp = fullcourseDetail.places[place].map((pla, index) => {
          return new kakao.maps.LatLng(pla.place.lat, pla.place.lng);
        });
        newLinePath = [...newLinePath, tmp];
      });
      setLinePath(newLinePath);
    } else {
      console.log(3);
    }
  }, [fullcourseDetail]);

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.17962489619582, 129.07480154639234),
      level: 9,
    };

    var map = new kakao.maps.Map(container, options);

    if (checkedDay === 6) {
      for (var i = 0; i < markerList.length; i++) {
        for (var j = 0; j < markerList[i].length; j++) {
          // 지도에 표시할 선을 생성합니다
          var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#041688', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
          });

          // 지도에 선을 표시합니다
          polyline.setMap(map);
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new kakao.maps.Size(30, 40);

          // 마커 이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(
            `/img/marker/marker${i}.png`,
            imageSize,
          );

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: markerList[i][j].latlng, // 마커를 표시할 위치
            title: markerList[i][j].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }
      }
    } else {
      for (var i = 0; i < markerList.length; i++) {
        if (checkedDay === i) {
          for (var j = 0; j < markerList[i].length; j++) {
            // 지도에 표시할 선을 생성합니다
            var polyline = new kakao.maps.Polyline({
              path: linePath[i], // 선을 구성하는 좌표배열 입니다
              strokeWeight: 5, // 선의 두께 입니다
              strokeColor: '#041688', // 선의 색깔입니다
              strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle: 'solid', // 선의 스타일입니다
            });

            // 지도에 선을 표시합니다
            polyline.setMap(map);
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(30, 40);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(
              `/img/marker/marker${i}.png`,
              imageSize,
            );

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: markerList[i][j].latlng, // 마커를 표시할 위치
              title: markerList[i][j].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
          }
        }
      }
    }
  }, [markerList, checkedDay]);

  return (
    <MapBlock>
      <div id="map"></div>
    </MapBlock>
  );
};

export default FullcourseMap;
