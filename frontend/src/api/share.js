import client from './client';

export const getSharedFc = async (data) => {
  const res = await client.get(`api/share/fullcourse/${data}`);
  return res;
};
