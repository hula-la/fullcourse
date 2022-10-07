import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

// 모바일
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Link, useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';





const Wrapper = styled.div`
  width: 100%;
  & > .content {
    position: relative;
    box-sizing: border-box;
    height: auto;
    min-height: 100%;
    /* padding-bottom: 100px; */
  }
`;

const Explore = styled.div`
/* display: none; */
position: fixed;
right:1%;
bottom: 1%;
width: 40px;
height: 40px;

@media only screen and (max-device-width: 479px) {
  display: block;
}

&:hover,
.explore:hover {
  .explore {
    display: block;
  }
}

.explore {
  position: relative;
  width: 40px;
  height: 40px;

  display: none;

  position: absolute;
  bottom: 0;
  right: 0;

  &-thing {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;

    &:nth-child(1) {
      transform: translateX(-50px);
      animation: icon1 0.5s;
      padding-right: calc(10% + 10px);
      color: #666;
      cursor: pointer;
      &:hover {
        color: #e36387;
      }
    }
    
    &:nth-child(2) {
      transform: translateX(-50px) translateY(-50px);
      animation: icon2 0.5s;
      padding-right: calc(10% + 10px);
      padding-bottom: calc(10% + 10px);
      color: #666;
      cursor: pointer;
      &:hover {
        color: #0aa1dd;
      }
    }
    &:nth-child(3) {
      transform: translateY(-50px);
      animation: icon3 0.5s;
      padding-bottom: calc(10% + 10px);
      color: #666;
      cursor: pointer;
      &:hover {
        color: #0aa1dd;
      }
    }
  }
}

.explore-link {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  color: #233e8b;
  cursor: pointer;
  transition: ease 0.3s;
  transform: scale(1) rotate(0deg);

  &:hover {
    transition: ease 0.3s;
    transform: scale(1.1) rotate(45deg);
  }
}

@keyframes icon1 {
  0% {
    opacity: 0;
    transform: translateX(0);
  }

  100% {
    opacity: 1;
    transform: translateX(-50px);
  }
}
@keyframes icon2 {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50px) translateY(-50px);
  }
}
@keyframes icon3 {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50px);
  }
}
`;

const Layout = () => {
  
  const onClickProfile = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  navigate('/user/profile/1');
};
  const onClickShare = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  navigate('/fullcourse');
};

const scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/');
  };

  
const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="content">
        {/* <Header /> */}
        <div>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
      <Explore>
        <div className="explore">
          <AccountCircleIcon
            onClick={onClickProfile}
            className="explore-thing"
          />
          <ShareIcon
            onClick={onClickShare}
            className="explore-thing"
          />
          <HomeIcon
            onClick={scrollToTop}
            className="explore-thing"
          />
        </div>
        <ExploreIcon className="explore-link" />
      </Explore>
    </Wrapper>
  );
};

export default Layout;
