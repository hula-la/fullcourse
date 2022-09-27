import React from 'react';
import { useDispatch } from 'react-redux';
import { eraseUser } from '../../../features/user/userActions';
import { logout } from '../../../features/user/userSlice';
import styled from 'styled-components';

const Wapper = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  font-size: 80px;
  text-align: center;
  .icon {
    font-size: 200px;
  }
`;

const StyledButton = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  width: 200px;
  height: 30px;
  line-height: 30px;
  margin: 20px auto;
  border-radius: 10px;
  background: rgba(164, 216, 255, 1) 0%;

  border: solid 2px #ffffff;
  &:hover {
    color: #4b94ca;
    background: #ffffff;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    border: solid 2px #4b94ca;
    transition: 0.5s;
  }
`;

const DeleteUser = () => {
  const dispatch = useDispatch();

  const onClick = async () => {
    await dispatch(eraseUser());
    dispatch(logout());
  };
  return (
    <Wapper>
      <div>정말 탈퇴하실건가요ㅜ?</div>
      <div className="icon">😂</div>
      <StyledButton onClick={onClick}>네, 탈퇴하겠습니다.</StyledButton>
    </Wapper>
  );
};

export default DeleteUser;
