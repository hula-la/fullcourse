import React from "react";
import LoginForm from "../../components/user/LoginForm";
import styled from "styled-components";
import login from "../../img/Login.jpg";

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
      <img src={login} alt="loginimg" />
      <LoginForm />
    </LoginBox>
  );
};

export default LoginPage;
