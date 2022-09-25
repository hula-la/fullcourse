import client from './client';

export const getTravelPlaceList = async (placeType) => {
  const res = await client.get(`api/place/${placeType}/list`);
  return res;
};
