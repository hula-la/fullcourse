import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/Logo.png";

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
    /* margin-left: 4rem;*/
  }

  button {
    background: #ffffff;
    border-radius: 36px;
  }
`;

const Menu = styled.div`
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
  return (
    <NavBar>
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo" />
      </NavLink>
      <Menu>
        <button className="login">login</button>
        <button className="signup">signup</button>
      </Menu>
    </NavBar>
  );
};

export default Header;
