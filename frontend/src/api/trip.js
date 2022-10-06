import client from './client';

export const getFullcourseDetail = async (fcId) => {
  const res = await client.get(`api/fullcourse/${fcId}`);
  return res;
};

export const getTravelPlaceList = async (
  placeType,
  page,
  sortReq,
  keyword,
  maxDist,
  recentLat,
  recentLng,
) => {
  const res = await client.get(`api/place/${placeType}/list`, {
    params: {
      page,
      size: 9,
      sort: `${sortReq},desc`,
      keyword,
      maxDist,
      recentLat,
      recentLng,
    },
  });
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

//장소 리뷰
export const postReview = async (img, content, score, placeId, placeType) => {
  const formData = new FormData();
  formData.append('file', img);
  formData.append(
    'reviewPostReq',
    new Blob([JSON.stringify({ content, score })], {
      type: 'application/json',
    }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post(
    `api/review/${placeType}/${placeId}`,
    formData,
    config,
  );
  return res;
};

export const postDiary = async (img, content, fcDetailId) => {
  const formData = new FormData();
  formData.append('img', img);
  formData.append('content', content);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.put(
    `api/fullcourse/diary/${fcDetailId}`,
    formData,
    config,
  );
  return res;
};

//장소리뷰조회
export const getPlaceReview = async (placeId, placeType) => {
  const res = await client.get(`api/review/${placeType}/list/${placeId}/`);
  return res;
};

//리뷰삭제
export const deletePlaceReview = async (placeType, reviewId) => {
  const res = await client.delete(`api/review/${placeType}/${reviewId}`);
  return res;
};
//풀코스삭제
export const deleteFc = async (fcId) => {
  const res = await client.delete(`api/fullcourse/${fcId}`);
  return res;
};
