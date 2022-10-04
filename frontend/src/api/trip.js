import client from './client';

export const getFullcourseDetail = async (fcId) => {
  const res = await client.get(`api/fullcourse/${fcId}`);
  return res;
};

export const getTravelPlaceList = async (placeType, page, sortReq, keyword, maxDist, recentLat, recentLng) => {
  const res = await client.get(`api/place/${placeType}/list`, {
    params: { page, size: 9, sort:`${sortReq},desc`, keyword, maxDist, recentLat, recentLng }});
  console.log("잘보내고 있는거 같은데")
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
  console.log("잘넘어오나",img,content, score, placeId,placeType);
  const formData = new FormData();
  formData.append('file', img);
  formData.append(
    'reviewPostReq',
    new Blob([JSON.stringify({content, score})], { type: 'application/json' }),
  );
  console.log("data형태뭐지", formData)
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
  console.log(res);
  return res;
};


//장소리뷰조회
export const getPlaceReview = async (placeId,placeType) => {
  console.log("여기까진오나",placeId,placeType)
  const res = await client.get(`api/review/${placeType}/list/${placeId}/`);
  console.log("어디서멈춤",res)
  return res;
};


//리뷰삭제
export const deletePlaceReview = async (placeType, reviewId) => {
  const res = await client.delete(
    `api/review/${placeType}/${reviewId}`,
  );
  return res;
};