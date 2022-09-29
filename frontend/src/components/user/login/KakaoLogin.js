import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  fetchUserInfo,
  userLoginKakao,
} from '../../../features/user/userActions';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  .kakao {
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
    @media only screen and (min-device-width: 375px) and (max-device-width: 479px) {
      box-shadow: 2px 2px 2px #4646466b;
    }
    background-color: #fee500;
    color: #000000 85%;
    margin: 0 auto;
    cursor: pointer;
  }
  .kakaologo {
    height: 2.5rem;
    width: auto;
  }
`;

const KakaoLogin = () => {
  const { Kakao } = window;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getKakaoToken = () => {
    Kakao.Auth.login({
      success: (authObj) => {
        dispatch(userLoginKakao(authObj.access_token));
        dispatch(fetchUserInfo());
        navigate('/');
      },
    });
  };

  return (
    <Wrapper>
      <button onClick={getKakaoToken} className="kakao">
        <img src="/img/kakao.png" alt="kakao" className="kakaologo" />
        Login with Kakao
      </button>
    </Wrapper>
  );
};

export default KakaoLogin;
