import React from 'react';
import LoginForm from '../../components/user/login/LoginForm';
import styled from 'styled-components';

const LoginBox = styled.div`
  display: flex;

  .loginImg {
    height: 100vh;
    width: 60%;
    @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
      position: relative;
      width: 100vw;
      filter: brightness(80%);
    }
  }
`;

const MobileLoginPage = () => {
  return (
    <LoginBox>
      <img className="loginImg" src="/img/Login.jpg" alt="loginimg" />
      <LoginForm />
    </LoginBox>
  );
};

export default MobileLoginPage;
