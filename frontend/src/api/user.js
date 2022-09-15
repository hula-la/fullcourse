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
