import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { checkNickname } from '../../../api/user';
import { putUserInfo } from '../../../features/user/userActions';

const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UpdateProfile = ({ userInfo }) => {
  const [userImg, setUserImg] = useState(userInfo.imgUrl);
  const [imgFile, setImgFile] = useState(null);
  const [userNickname, setUserNickname] = useState(userInfo.nickname);
  const [userNicknameMessage, setUserNicknameMessage] = useState('');
  const [isuserNickname, setIsUserNickname] = useState(false);
  const [isNickChecked, setIsNickChecked] = useState(false);

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
            value={userNickname}
            onChange={onChangeNickname}
          />
          {userNickname.length > 0 && (
            <div
              className={isuserNickname && isNickChecked ? 'success' : 'error'}
            >
              {userNicknameMessage}
            </div>
          )}
        </div>
        <button>제출</button>
      </UpdateProfileForm>
    </div>
  );
};

export default UpdateProfile;
