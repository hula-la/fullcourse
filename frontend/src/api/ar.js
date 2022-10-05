import client from './client';

export const getPlaceTravel = async () => {
  const res = await client.get('api/place/travel/list');
  return res;
};
