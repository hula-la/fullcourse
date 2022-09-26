import client from './client';

export const getSharedFc = async (data, page) => {
  console.log(data);
  const res = await client.post('api/share/fullcourse/search', data, {
    params: { page, size: 9 },
  });
  return res;
};

export const getTravelPlaceList = async (placeType) => {
  const res = await client.get(`api/place/${placeType}/list`);
  return res;
};
