import client from './client';

export const getRandomPlace = async () => {
  const res = await client.get('/api/recommend/randomlist');
  return res;
};
