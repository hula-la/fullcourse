import client from './client';

export const getRandomPlace = async () => {
  const res = await client.get('/api/recommend/randomlist');
  return res;
};

export const getRecommendPlace = async (placeId) => {
  const res = await client.get('api/recommend/similar', {
    params: { num: 4, placeId },
  });
  return res;
};
