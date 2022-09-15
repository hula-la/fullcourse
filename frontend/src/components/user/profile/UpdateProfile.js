import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { putUserInfo } from '../../../features/user/userActions';

const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const UpdateProfile = ({ userInfo }) => {
  const [userImg, setUserImg] = useState(userInfo.imgUrl);
  const [imgFile, setImgFile] = useState(null);
  const [userNickname, setUserNickname] = useState({
    nickname: userInfo.nickname,
  });

  const dispatch = useDispatch();

  const onChangeUserImg = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setUserImg(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    } else {
      setUserImg(null);
      setImgFile(null);
    }
  };

  const onChangeNickname = (e) => {
    const { name, value } = e.target;
    const nextInfo = {
      ...userNickname,
      [name]: value,
    };
    setUserNickname(nextInfo);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(putUserInfo({ userNickname, imgFile }));
  };

  return (
    <div>
      {userImg ? <img src={userImg} alt="" /> : null}
      <UpdateProfileForm onSubmit={onSubmit}>
        <input
          id="profile"
          type="file"
          accept="image/*"
          onChange={onChangeUserImg}
        />
        <div>
          <label>닉네임</label>
          <input
            id="nickname"
            type="text"
            defaultValue={userInfo.nickname}
            onChange={onChangeNickname}
          />
        </div>
        <button>제출</button>
      </UpdateProfileForm>
    </div>
  );
};

export default UpdateProfile;
