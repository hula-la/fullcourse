/* global kakao */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import styled from 'styled-components';
import '../place.css';

const MapBlock = styled.div`
  width: 100%;
  height: 30vh;
  #map {
    width: 100%;
    height: 100%;
  }
  .customoverlay_main {
    position: relative;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;
    display: block;
    text-decoration: none;
    color: #fff;
    border-radius: 6px;
    overflow: hidden;
    background: #333333;
    margin-bottom: 120px;
  }
  .customoverlay_main .title {
    display: block;
    padding: 6px 11px;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
  }
`;

const PlaceImg = styled.div`
  width: 30%;
  text-align: center;
  position: relative;
`;

const MobileFullcourseMap = () => {
  const { fullcourseDetail } = useSelector((state) => state.trip);
  const { checkedDay } = useSelector((state) => state.share);
  const { moveLat } = useSelector((state) => state.share);
  const { moveLng } = useSelector((state) => state.share);
  const [markerList, setMarkerList] = useState([]);
  const [linePath, setLinePath] = useState([]);
  const [overlayList, setOverlayList] = useState([]);
  const lineColorList = ['#ff5854', '#66ff5c', '#ffbc65', '#655aff', '#e574ff'];

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
      let newoverlayList = [];
      Object.keys(fullcourseDetail.places).map((place, index) => {
        const tmp = fullcourseDetail.places[place].map((pla, index) => {
          return {
            latlng: new kakao.maps.LatLng(pla.place.lat, pla.place.lng),
          };
        });
        newoverlayList = [...newoverlayList, tmp];
      });
      setOverlayList(newoverlayList);
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
    }
  }, [fullcourseDetail]);

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.17962489619582, 129.07480154639234),
      level: 10,
    };

    var map = new kakao.maps.Map(container, options);

    if (moveLat) {
      let moveLatLon = new kakao.maps.LatLng(moveLat, moveLng);
      map.setCenter(moveLatLon);
    }

    if (checkedDay === 6) {
      for (let i = 0; i < markerList.length; i++) {
        for (let j = 0; j < markerList[i].length; j++) {
          console.log(i);
          console.log(lineColorList[i]);
          // 커스텀 오버레이에 표시할 내용입니다
          // HTML 문자열 또는 Dom Element 입니다
          var content =
            '<div class="customoverlay_main">' +
            '    <span class="title">' +
            markerList[i][j].title +
            '</span>' +
            '</div>';

          let customOverlay1 = new kakao.maps.CustomOverlay({
            position: overlayList[i][j].latlng,
            content: content,
          });

          customOverlay1.setMap(map);
          // 지도에 표시할 선을 생성합니다
          let polyline = new kakao.maps.Polyline({
            path: linePath[i], // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: lineColorList[i], // 선의 색깔입니다
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
          let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: markerList[i][j].latlng, // 마커를 표시할 위치
            title: markerList[i][j].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          let iwContent =
            '<div class="place">' +
            '<div ' +
            'class="placeMemo">' +
            '<p>' +
            markerList[i][j].title +
            '✨' +
            '</p>' +
            '</div>' +
            '<img ' +
            'class="placeImg"' +
            'src=' +
            fullcourseDetail.places[i][j].img +
            ' />' +
            '</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

          // 커스텀 오버레이가 표시될 위치입니다
          // 커스텀 오버레이를 생성합니다
          let customOverlay = new kakao.maps.CustomOverlay({
            position: overlayList[i][j].latlng,
            content: iwContent,
          });

          // 커스텀 오버레이를 지도에 표시합니다

          if (fullcourseDetail.places[i][j].img) {
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              // 마커 위에 인포윈도우를 표시합니다
              customOverlay.setMap(map);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function () {
              setTimeout(function () {
                customOverlay.setMap();
              });
            });
          }
        }
      }
    } else {
      for (var i = 0; i < markerList.length; i++) {
        if (checkedDay === i) {
          for (var j = 0; j < markerList[i].length; j++) {
            // 커스텀 오버레이에 표시할 내용입니다
            // HTML 문자열 또는 Dom Element 입니다
            var content =
              '<div class="customoverlay_main">' +
              '    <span class="title">' +
              markerList[i][j].title +
              '</span>' +
              '</div>';
            // 커스텀 오버레이가 표시될 위치입니다
            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
              position: overlayList[i][j].latlng,
              content: content,
            });
            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(map);
            // 지도에 표시할 선을 생성합니다
            let polyline = new kakao.maps.Polyline({
              path: linePath[i], // 선을 구성하는 좌표배열 입니다
              strokeWeight: 5, // 선의 두께 입니다
              strokeColor: lineColorList[i], // 선의 색깔입니다
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

            let iwContent =
              '<div class="place">' +
              '<div ' +
              'class="placeMemo">' +
              '<p>' +
              markerList[i][j].title +
              '✨' +
              '</p>' +
              '</div>' +
              '<img ' +
              'class="placeImg"' +
              'src=' +
              fullcourseDetail.places[i][j].img +
              ' />' +
              '</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

            // 커스텀 오버레이가 표시될 위치입니다
            // 커스텀 오버레이를 생성합니다
            let customOverlay3 = new kakao.maps.CustomOverlay({
              position: overlayList[i][j].latlng,
              content: iwContent,
            });

            // 커스텀 오버레이를 지도에 표시합니다

            if (fullcourseDetail.places[i][j].img) {
              kakao.maps.event.addListener(marker, 'mouseover', function () {
                // 마커 위에 인포윈도우를 표시합니다
                customOverlay3.setMap(map);
              });
              kakao.maps.event.addListener(marker, 'mouseout', function () {
                setTimeout(function () {
                  customOverlay3.setMap();
                });
              });
            }
          }
        }
      }
    }
  }, [markerList, checkedDay, moveLat, moveLng]);

  return (
    <MapBlock>
      <div id="map"></div>
    </MapBlock>
  );
};

export default MobileFullcourseMap;
