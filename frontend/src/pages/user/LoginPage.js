import React from 'react';
import LoginForm from '../../components/user/login/LoginForm';
import styled from 'styled-components';

const LoginBox = styled.div`
  display: flex;

  img {
    height: 90vh;
    width: 60%;
  }
`;

const LoginPage = () => {
  return (
    <LoginBox>
      <img src="/img/Login.jpg" alt="loginimg" />
      <LoginForm />
    </LoginBox>
  );
};

export default LoginPage;
