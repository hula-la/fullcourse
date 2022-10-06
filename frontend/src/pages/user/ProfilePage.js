import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/user/profile/SideBar';
import MyFullcourse from '../../components/user/profile/MyFullcourse';
import UpdateProfile from '../../components/user/profile/UpdateProfile';
import DeleteUser from '../../components/user/profile/DeleteUser';
import MyLikeSharedFc from '../../components/user/profile/MyLikeSharedFc';
import MySharedFc from '../../components/user/profile/MySharedFc';
import styled from 'styled-components';
import MobileSideBar from '../../components/user/profile/MobileSideBar';
import { makeStyles, useMediaQuery } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;

  /* flex-direction: column; */
  /* height: 1300px; */
  justify-content: start;
  padding-bottom: 10vh;
  /* background: url('/img/mypage.png'); */
  background: url('/img/memo.jpg');

  height: auto;
  min-height: 100%;

  #view {
    width: 80%;
  }
`;

const FullcourseBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vh auto;
  padding: 3vh;
  width: 75vw;
  @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
    margin: 0 auto;
    padding: 0;
  }
`;

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const pageNum = params.pageNum ? params.pageNum : '1';
  const isMobile = useMediaQuery('(max-width: 767px)');

  const onClickPageOne = () => {
    navigate(`/user/profile/1`, { replace: true });
  };
  const onClickPageTwo = () => {
    navigate(`/user/profile/2`, { replace: true });
  };
  const onClickPageThree = () => {
    navigate(`/user/profile/3`, { replace: true });
  };

  return (
    <Wrapper
      id="scroll"
      style={isMobile ? { flexDirection: 'column' } : { flexDirection: 'row' }}
    >
      {!isMobile ? (
        <SideBar
          onClickPageOne={onClickPageOne}
          onClickPageTwo={onClickPageTwo}
          onClickPageThree={onClickPageThree}
          userInfo={userInfo}
        />
      ) : (
        <MobileSideBar
          onClickPageOne={onClickPageOne}
          onClickPageTwo={onClickPageTwo}
          onClickPageThree={onClickPageThree}
          userInfo={userInfo}
        />
      )}
      {pageNum === '1' && userInfo && (
        <FullcourseBox>
          <MyFullcourse userInfo={userInfo} />
          <MySharedFc />
          <MyLikeSharedFc />
        </FullcourseBox>
      )}
      {pageNum === '2' && userInfo && <UpdateProfile userInfo={userInfo} />}
      {pageNum === '3' && <DeleteUser userInfo={userInfo} />}
    </Wrapper>
  );
};

export default ProfilePage;
