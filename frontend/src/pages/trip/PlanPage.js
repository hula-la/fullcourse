import React from 'react';
import styled from 'styled-components';
import PlanBar from '../../components/trip/plan/PlanBar';
import PlanMap from '../../components/trip/PlanMap';
import PlaceBar from '../../components/trip/place/PlaceBar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* height: 100vh; */
  overflow: hidden;
  overscroll-behavior-y: contain !important;
`;

const PlanPage = () => {
  return (
    <div>
      <Container>
        <PlanBar></PlanBar>
        <PlanMap></PlanMap>
        <PlaceBar></PlaceBar>
      </Container>
    </div>
  );
};

export default PlanPage;
