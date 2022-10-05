import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { checkNickname } from '../../../api/user';
import { putUserInfo } from '../../../features/user/userActions';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Swal from 'sweetalert2';

const Wrapper = styled.div`
  margin: 3vw auto;
  padding: 2vw;

  input[type='file'] {
    display: none;
  }
`;

const UserImg = styled.div`
  img {
    width: 150px;
    height: 150px;
    border-radius: 10rem;
  }

  label {
    cursor: pointer;
    position: relative;
    right: 33px;
    bottom: 2px;
    @media screen and (max-width: 812px) {
      right: 34px;
      bottom: 2px;
    }
  }
  label .icon {
    border: solid 2px black;
    border-radius: 1rem;
    padding: 2px;
    background-color: black;
    color: white;
  }
`;

const UserNickName = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  #nickname {
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
    text-align: center;
    outline: none;
    border: solid 2px #a4d8ff;
    border-radius: 2rem;
    justify-content: center;
    padding: 3px;
    /* width: 60vw; */
    &:focus {
      background-color: #a4d8ff;
      transition: 0.3s;
    }
  }
`;

const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 2vw;
  text-align: center;
  width: 90vw;
  max-width: 460px;
  button {
    width: fit-content;
    margin: auto;
  }
  .msg {
    height: 30px;
    margin: 8px 0 1px 0;
    font-size: 13px;
  }
  .success {
    color: gray;
  }
  .error {
    color: #0095ff;
  }
  button {
    outline: 0;
    border: 0;
    width: 50px;
    height: 2rem;
    text-align: center;
    /* margin-bottom: 40px; */
    margin-left: 10px;
    cursor: pointer;
    align-items: center;
    border-radius: 10px;
    font-size: 14px;
    background: linear-gradient(
      90deg,
      rgba(217, 239, 255, 1) 0%,
      rgba(164, 216, 255, 1) 100%
    );
    color: darkslategray;
    border: solid 2px #ffffff;
  }
  button:hover {
    color: #4b94ca;
    background: rgba(164, 216, 255, 1) 0%;
    box-shadow: 3px 3px 5px rgba(164, 216, 255, 0.64);
    border: solid 2px #4b94ca;
    transition: 0.5s;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1vh 0;
    text-align: left;
  }
  .type {
    width: 25%;

    color: #4b94ca;
    padding-bottom: 3px;
  }
  .info {
    text-align: left;
    width: 60%;
    /* border-bottom: solid 3px #a4d8ff; */
    padding-bottom: 3px;
    padding-right: 5px;
  }
  .icon {
    color: #4b94ca;
    margin-left: 3vw;
  }
`;

const UpdateProfile = ({ userInfo }) => {
  const [userImg, setUserImg] = useState(userInfo.imgUrl);
  const [imgFile, setImgFile] = useState(null);
  const [userNickname, setUserNickname] = useState(userInfo.nickname);
  const [userNicknameMessage, setUserNicknameMessage] = useState('');
  const [isuserNickname, setIsUserNickname] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);
  const [userEmail, setUserEmail] = useState(userInfo.nickname);
  const [userGender, setUserGender] = useState(userInfo.nickname);

  const dispatch = useDispatch();

  const onChangeUserImg = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setUserImg(base64.toString());
      } else {
        setUserImg(null);
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    } else {
      setImgFile(null);
    }
  };

  const onChangeNickname = useCallback(async (e) => {
    const nicknameRegex = /^[가-힣|a-z|A-Z|0-9|]+$/;
    const changeNickname = e.target.value;
    setUserNickname(changeNickname);
    const { statusCode } = await checkNickname(changeNickname);
    if (!nicknameRegex.test(changeNickname)) {
      setUserNicknameMessage('숫자, 한글, 영어만 입력가능합니다!');
      setIsUserNickname(false);
    } else if (statusCode === 400) {
      setUserNicknameMessage('중복된 닉네임입니다!');
      setIsNickChecked(false);
    } else if (statusCode === 200) {
      setUserNicknameMessage('올바른 닉네임 형식입니다 :)');
      setIsNickChecked(true);
      setIsUserNickname(true);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(putUserInfo({ userNickname, imgFile }));
    if (payload.statusCode === 200) {
      Swal.fire({
        icon: 'success',
        title: '프로필이 변경되었습니다',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    setUserEmail(userInfo.email.split('-')[0]);
    setUserGender(userInfo.ageRange.split('~')[0]);
  }, []);

  return (
    <Wrapper>
      <UpdateProfileForm onSubmit={onSubmit}>
        <UserImg>
          {userImg ? <img src={userImg} alt="" /> : null}
          <label for="profile">
            <EditIcon className="icon" />
          </label>
        </UserImg>
        <input
          id="profile"
          type="file"
          accept="image/*"
          onChange={onChangeUserImg}
        />

        <UserNickName>
          <span>
            <input
              id="nickname"
              type="text"
              value={userNickname}
              onChange={onChangeNickname}
            />
            <button>수정</button>
            {userNickname.length >= 0 && (
              <div
                className={
                  isuserNickname && isNickChecked ? 'msg success' : 'msg error'
                }
              >
                {userNicknameMessage}
              </div>
            )}
          </span>
        </UserNickName>
        <UserInfo>
          <div>
            <EmailIcon className="icon" />
            <span className="type">Email</span>
            <span className="info">{userEmail}</span>
          </div>
          <div>
            {userInfo.gender === 'WOMAN' ? (
              <FemaleIcon className="icon" />
            ) : (
              <MaleIcon className="icon" />
            )}
            <span className="type">Gender</span>
            <span className="info">{userInfo.gender}</span>
          </div>
          <div>
            <CalendarMonthIcon className="icon" />
            <span className="type">Age</span>
            <span className="info">{userGender}대</span>
          </div>
        </UserInfo>
      </UpdateProfileForm>
    </Wrapper>
  );
};

export default UpdateProfile;
