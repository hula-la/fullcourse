import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/exports';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdClock } from 'react-icons/io';
import { GiRotaryPhone } from 'react-icons/gi';

const Container = styled.div`
  padding: 0 4vh;
  .linkPlace {
    &:hover {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 60%, #0abdff 50%);
    }
  }
`;

const PlaceTitle = styled.div`
  text-decoration: none;
  text-align: start;
  width: 8vw;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 60%, #a5f1e9 50%);
  font-weight: bold;
  color: #333333;
`;
const PlaceSubTitle = styled.div`
  text-align: start;
  width: 15vw;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 1.8vmin;
  margin-top: 2vh;
  .content {
    display: flex;
    align-items: center;
    margin-top: 1vh;
  }
  p {
    text-align: start;
    margin: 0 0 0 0.5vw;
  }
`;

const Address = styled(FaMapMarkerAlt)`
  font-size: 3vmin;
  color: #0aa1dd;
`;

const OpenTime = styled(IoMdClock)`
  font-size: 3vmin;
  color: #0aa1dd;
`;

const Phone = styled(GiRotaryPhone)`
  font-size: 3vmin;
  color: #0aa1dd;
`;
const PlaceDetailContent = () => {
  const { placeDetail } = useSelector((state) => state.trip);
  const [placeUrl, setPlaceUrl] = useState('');

  useEffect(() => {
    if (placeDetail.url && placeDetail.url.length > 2) {
      setPlaceUrl(placeUrl);
    }
  }, []);
  return (
    <Container>
      {placeDetail.url && placeDetail.url.length > 2 ? (
        <div className="title">
          <a href={placeDetail.url}>
            <PlaceTitle className='linkPlace'>{placeDetail.name}</PlaceTitle>
          </a>
        </div>
      ) : <PlaceTitle>{placeDetail.name}</PlaceTitle>}


      {placeDetail.subtitle ? (
        <div className="subtitle">
          <p>{placeDetail.subtitle}</p>
        </div>
      ) : null}
      <Content>
        {placeDetail.address ? (
          <div className="content">
            <Address />
            <p>{placeDetail.address}</p>
          </div>
        ) : null}
        {placeDetail.openTime ? (
          <div className="content">
            <OpenTime />
            <p>{placeDetail.openTime}</p>
          </div>
        ) : null}
        {placeDetail.day ? (
          <div className="content">
            <OpenTime />
            <p>{placeDetail.day}</p>
          </div>
        ) : null}
        {placeDetail.tel ? (
          <div className="content">
            <Phone />
            <p>{placeDetail.tel}</p>
          </div>
        ) : null}
      </Content>
    </Container>
  );
};

export default PlaceDetailContent;
