import client from './client';

export const loginNaver = async (data) => {
  const res = await client.post('api/user/naver', data);
  return res;
};

export const loginKakao = async (data) => {
  const res = await client.post('api/user/kakao', data);
  return res;
};

export const getUserInfo = async () => {
  const res = await client.get('api/user');
  return res;
};

export const getMyFullcourse = async () => {
  const res = await client.get(`api/fullcourse/my`);
  return res;
};

export const updateUserInfo = async (nickname, imgFile) => {
  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append(
    'userDto',
    new Blob([JSON.stringify(nickname)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post('api/user', formData, config);
  return res;
};

export const deleteUser = async () => {
  const res = await client.delete('api/user');
  return res;
};

export const checkNickname = async (data) => {
  const res = await client.post('api/user/nickname', { nickname: data });
  return res.data;
};
