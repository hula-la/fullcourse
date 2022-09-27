import client from './client';

export const getFullcourseDetail = async (fcId) => {
  const res = await client.get(`api/fullcourse/${fcId}`);
  return res;
};

export const getTravelPlaceList = async (placeType) => {
  const res = await client.get(`api/place/${placeType}/list`);
  return res;
};
