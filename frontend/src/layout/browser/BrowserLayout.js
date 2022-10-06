import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../features/user/userSlice';

const Wrapper = styled.div`
  width: 93vw;
  height: 95vh;
  margin-right: 3vw;

  border: 0.3rem dashed #0aa1dd;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #d9d9d9;

  .navStan {
    position: relative;
    width: calc(100% - 20px);
    height: calc(100% - 20px);

    z-index: 1;
  }

  .innerBox {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 1rem;
    border: 0.3rem solid #0aa1dd;
    background: white;

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 15px;
      border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;

      background-color: #0aa1dd;
      /* 스크롤바 둥글게 설정    */
      border-radius: 1rem;
      border: 2px solid transparent;
      width: 5px;
    }

    /* 스크롤바 뒷 배경 설정*/

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
    }
  }

  .logButton {
    position: fixed;
    right: 0.4rem;
    bottom: 2rem;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const NavBar = styled.div`
  width: 5rem;
  height: 20rem;

  text-align: right;

  position: absolute;
  left: calc(100% - 3rem);
  top: 5%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .navItem {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 3rem;
    font-size: 1rem;
    position: relative;
    background: white;
    padding: 0.5rem;
    border-radius: 0 1rem 1rem 0;

    font-weight: bold;

    font-size: 0.8rem;

    cursor: pointer;

    &:hover {
      left: 3rem;
    }

    span {
      margin-right: 0.5rem;
    }
  }

  .active {
    background: #0aa1dd;
    color: white;
  }
`;

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <div className="navStan">
        <NavBar>
          <div>
            <NavLink to="/" activeclassname="active" className="navItem">
              <span>
                메인
                <br />
                페이지
              </span>
              🚩
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/trip/plan"
              activeclassname="active"
              className="navItem"
            >
              <span>
                풀코스
                <br />
                짜기
              </span>
              📝
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/fullcourse"
              activeclassname="active"
              className="navItem"
            >
              <span>
                풀코스
                <br />
                탐색
              </span>
              🔎
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/user/profile/1"
              activeclassname="active"
              className="navItem"
            >
              <span>
                마이
                <br />
                페이지
              </span>
              😎
            </NavLink>
          </div>
          <div>
            <div className="navItem">
              <span>
                로그
                <br />
                아웃
              </span>
            </div>
          </div>
        </NavBar>
        <div className="innerBox">
          <Outlet />
        </div>
      </div>

      {userInfo ? (
        <button className="logButton" onClick={(e) => dispatch(logout())}>
          로그아웃
        </button>
      ) : (
        <button className="logButton" onClick={(e) => navigate('/login')}>
          로그인
        </button>
      )}
    </Wrapper>
  );
};

export default Layout;
