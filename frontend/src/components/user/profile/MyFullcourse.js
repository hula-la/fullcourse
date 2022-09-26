import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyFullcourse } from '../../../features/user/userActions';
import MyFullcourseItem from './MyFullcourseItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const MyFullcourse = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { myFullcourseList } = useSelector((state) => state.user);

  useEffect(() => {
    // dispatch(fetchMyFullcourse(userInfo.email));
    dispatch(fetchMyFullcourse('3'));
  }, [dispatch]);

  return (
    <div>
      <p>나의 풀코스</p>
      <Wrapper>
        {myFullcourseList
          ? myFullcourseList.content.map((fullcourse, index) => {
              return <MyFullcourseItem key={index} fullcourse={fullcourse} />;
            })
          : null}
      </Wrapper>
    </div>
  );
};

export default MyFullcourse;
