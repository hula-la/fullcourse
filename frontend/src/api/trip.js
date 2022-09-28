import client from './client';

export const getFullcourseDetail = async (fcId) => {
  const res = await client.get(`api/fullcourse/${fcId}`);
  return res;
};

export const getDiary = async (fcId) => {
  const res = await client.get(`api/fullcourse/diary/${fcId}`);
  return res;
};

export const getTravelPlaceList = async (placeType) => {
  const res = await client.get(`api/place/${placeType}/list`);
  return res;
};

export const postTrip = async (data) => {
  const res = await client.post(`api/fullcourse`, data);
  return res;
};
