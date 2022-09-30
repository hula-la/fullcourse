import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
height:calc(100vh - 80px);

body{
    margin: 0; 
    overflow: hidden;
}
`



const ArPage = () => {
  
  useEffect(() => {
      window.onload = () => {
          navigator.geolocation.getCurrentPosition((position) => {
        document.querySelector('a-text').setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`)
      });
     }
  }, []);

  return (
      <Wrapper>
        <>
            <a-scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            >
            {/* <a-text
                value="No markers around"
                look-at="[gps-camera]"
                scale="5 5 5"
                  ></a-text> */}
                <a-image
                    //   value="This content will always face you."
                      src="assets/asset.jpeg"
                look-at="[gps-camera]"
                scale="50 50 50"
                gps-entity-place="latitude: 35.0894571; longitude: 128.8533412;"
            ></a-image>
            <a-camera gps-camera rotation-reader> </a-camera>
            </a-scene>
        </>
    </Wrapper>
  );
};

export default ArPage;
