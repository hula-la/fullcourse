import client from './client';

export const getSharedFc = async (data) => {
  const res = await client.get(`api/share/fullcourse/${data}`);
  return res;
};

export const postSharedFc = async (data) => {
  const res = await client.post('api/share/fullcourse', data);
  return res;
};
