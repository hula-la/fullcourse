import React from 'react';
import SideBar from '../../components/user/profile/SideBar';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 1300px;

  #view {
    width: 80%;
  }
`;

const ProfilePage = () => {
  return (
    <Wrapper>
      <SideBar />
      <div id="view">view</div>
    </Wrapper>
  );
};

export default ProfilePage;
