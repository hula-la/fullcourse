import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/user/profile/SideBar';
import MyFullcourse from '../../components/user/profile/MyFullcourse';
import UpdateProfile from '../../components/user/profile/UpdateProfile';
import DeleteUser from '../../components/user/profile/DeleteUser';
import MyLikeSharedFc from '../../components/user/profile/MyLikeSharedFc';
import MySharedFc from '../../components/user/profile/MySharedFc';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 1300px;

  #view {
    width: 80%;
  }
`;

const FullcourseBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const pageNum = params.pageNum ? params.pageNum : '1';

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
    <Wrapper>
      <SideBar
        onClickPageOne={onClickPageOne}
        onClickPageTwo={onClickPageTwo}
        onClickPageThree={onClickPageThree}
        userInfo={userInfo}
      />
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
