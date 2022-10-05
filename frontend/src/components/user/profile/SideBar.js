import React, { useState } from 'react';
import styled from 'styled-components';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 15%;
  height: 100%;
  margin-top: 3rem;
  margin-left: 2rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 2rem;
  }

  #userInfo {
    display: flex;
    flex-direction: row;
    padding: 0 0 1rem 1rem;
    font-weight: 600;
    border-bottom: 2px solid #a4d8ff;
  }

  #imgBlock {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #buttonWrapper {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;
    height: 100%;
    border-radius: 10px;
  }

  #buttonWrapper .icon {
    margin: 0 0.5rem;
  }
`;

const StyledButton = styled.div`
  margin-bottom: 0.5rem;
  background-color: none;
  text-align: start;
  cursor: pointer;
  height: 3rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  :hover {
    background: linear-gradient(
      90deg,
      rgba(217, 239, 255, 1) 0%,
      rgba(164, 216, 255, 1) 100%
    );
    color: darkslategray;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    transition: 0.3s;
  }
  &.clicked {
    background: linear-gradient(
      90deg,
      rgba(217, 239, 255, 1) 0%,
      rgba(164, 216, 255, 1) 100%
    );
    color: darkslategray;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    font-weight: 700;
    transition: 0.3s;
  }
`;

const SideBar = ({
  onClickPageOne,
  onClickPageTwo,
  onClickPageThree,
  userInfo,
}) => {
  const [selectedItem, setSelectedItem] = useState(1);

  const onClickMenu = (props) => {
    setSelectedItem(props);
  };

  return (
    <>
      {userInfo ? (
        <Side>
          <div id="userInfo">
            <div id="imgBlock">
              <img src={userInfo.imgUrl} alt="profileImg" />
            </div>
            <p>{userInfo.nickname}</p>
          </div>
          <div id="buttonWrapper">
            <StyledButton
              className={selectedItem === 1 ? 'clicked' : ''}
              onClick={() => {
                onClickPageOne();
                onClickMenu(1);
              }}
            >
              <CardTravelIcon className="icon" />
              나의 풀코스
            </StyledButton>
            <StyledButton
              className={selectedItem === 2 ? 'clicked' : ''}
              onClick={() => {
                onClickPageTwo();
                onClickMenu(2);
              }}
            >
              <AccountCircleIcon className="icon" />
              회원정보 수정
            </StyledButton>
            <StyledButton
              className={selectedItem === 3 ? 'clicked' : ''}
              onClick={() => {
                onClickPageThree();
                onClickMenu(3);
              }}
            >
              <LockIcon className="icon" />
              회원 탈퇴
            </StyledButton>
          </div>
        </Side>
      ) : null}
    </>
  );
};

export default SideBar;
