import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
const NavBar = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .logo {
    height: 3rem;
    width: 8rem;
    margin-left: 3rem;
  }

  button {
    background: #ffffff;
    border-radius: 36px;
  }
`;

const Menu = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .login {
    border: none;
    cursor: pointer;
  }

  .signup {
    border: none;
    background: #0aa1dd;
    color: #eef3ff;
    cursor: pointer;
  }
`;

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <NavBar>
      <NavLink to="/">
        <img className="logo" src="/img/Logo2.png" alt="logo" />
      </NavLink>
      <Menu>
        {!userInfo ? (
          <NavLink to="/user/login">
            <button className="login">login</button>
          </NavLink>
        ) : (
          <div>
            <Link to="/user/profile/1">{userInfo.nickname}</Link>
            <img src="" alt="" />
            <Link to="/">
              <button className="login" onClick={() => dispatch(logout())}>
                <LogoutIcon />
              </button>
            </Link>
          </div>
        )}
      </Menu>
    </NavBar>
  );
};

export default Header;
