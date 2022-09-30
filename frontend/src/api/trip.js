import client from './client';

export const getFullcourseDetail = async (fcId) => {
  const res = await client.get(`api/fullcourse/${fcId}`);
  return res;
};

export const getTravelPlaceList = async (placeType, page) => {
  const res = await client.get(`api/place/${placeType}/list`, {
    params: { page, size: 9 }});
  return res;
};

export const postTrip = async (data) => {
  const res = await client.post(`api/fullcourse`, data);
  return res;
};


export const getPlaceDetail = async (placeId, placeType) => {
  const res = await client.get(`api/place/${placeType}/detail/${placeId}`);
  return res;
};

//장소리뷰포스트
export const postSharedFcComment = async (placeId, placeType, data) => {
  const res = await client.post('api/share/comment', data);
  return res;
};

//장소좋아요
export const postPlaceLike = async (placeId, placeType) => {
  const res = await client.post(`api/place/${placeType}/like/${placeId}`);
  return res;
};

