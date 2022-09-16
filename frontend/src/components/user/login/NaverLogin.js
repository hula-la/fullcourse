import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchUserInfo,
  userLoginNaver,
} from '../../../features/user/userActions';

const Wrapper = styled.div`
  #naverIdLogin {
    display: none;
  }

  .naver {
    padding: 0.6em 1em;
    border-radius: 0.25em;
    border: none;
    font-size: 1rem;
    margin-top: 0.7em;
    display: flex;
    width: 60%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    box-shadow: var(--shadow-1);
    background-color: #03c75a;
    color: white;
    margin: 0 auto;
    cursor: pointer;
  }
  .naverlogo {
    height: 2.5rem;
    width: auto;
  }
`;

const NaverLogin = () => {
  const { naver } = window;
  const naverRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NAVER_CLIENT_ID = 'nD3LMlh8XVw9Vkf10kQL';
  const NAVER_CALLBACK_URL = 'http://localhost:3000/user/login';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    dispatch(userLoginNaver(token));
    dispatch(fetchUserInfo());
    navigate('/');
  };

  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);

  const handleClick = () => {
    naverRef.current.children[0].click();
  };

  return (
    <Wrapper>
      <div ref={naverRef} id="naverIdLogin" />
      <button onClick={handleClick} className="naver">
        <img src="/img/naver.png" alt="naver" className="naverlogo" />
        Login with Naver
      </button>
    </Wrapper>
  );
};

export default NaverLogin;
