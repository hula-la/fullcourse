import client from './client';

export const getRandomPlace = async () => {
  const res = await client.get('/api/recommend/randomlist');
  return res;
};

export const getRecommendPlace = async (placeId) => {
  console.log(placeId);
  const res = await client.get('api/recommend/similar', {
    params: { num: 3, placeId },
  });
  console.log(res);
  return res;
};
