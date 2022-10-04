import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFullcourseDetail, getTravelPlaceList, postTrip, getPlaceDetail, postPlaceLike, postReview, getPlaceReview, deletePlaceReview  } from '../../api/trip';

//여행명소리스트 불러오기
export const fetchTravelPlace = createAsyncThunk(
  'trip/fetchTravelPlace',
  async ({placeType,pageNum, sortReq, keyword, maxDist, recentLat, recentLng}, { rejectWithValue }) => {
    console.log("요청잘가나",sortReq)
    try {
      const { data } = await getTravelPlaceList(placeType,pageNum, sortReq, keyword, maxDist, recentLat, recentLng);
      console.log("이거가능한가?")
      console.log(data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
         
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchFullcourseDetail = createAsyncThunk(
  'trip/fetchFullcourseDetail',
  async (fcId, { rejectWithValue }) => {
    try {
      const { data } = await getFullcourseDetail(fcId);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//여행일정생성
export const createTrip = createAsyncThunk(
  'trip/createTrip',
  async (createTripPostReq, { rejectWithValue }) => {
    console.log("여행요청객체", createTripPostReq)
    try {
      const { data } = await postTrip(createTripPostReq);
      console.log("일정생성에 성공했다네!!")
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//장소상세정보불러오기
export const fetchPlaceDetail = createAsyncThunk(
  'trip/fetchPlaceDetail',
  async ({placeId, placeType}, { rejectWithValue }) => {
    console.log("placeType",placeType)
    try {
      const { data } = await getPlaceDetail(placeId, placeType);
      console.log("이거 장소상세정보 되나")
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//여행지좋아요
export const createPlaceLike = createAsyncThunk(
  'trip/createPlaceLike',
  async ({placeId,placeType}, { rejectWithValue }) => {
    try {
      const { data } = await postPlaceLike(placeId,placeType);
      console.log("좋아요 성공")
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//장소리뷰쓰기
export const createReview = createAsyncThunk(
  'trip/createDiary',
  async ({ imageFile, reviewComment, value, placeId, placeType }, { rejectWithValue }) => {
    try {
      console.log(value,imageFile,reviewComment,placeId,placeType)
      console.log("제발성공")
      const { data } = await postReview(imageFile, reviewComment, value, placeId, placeType);
      console.log("data뭐지",data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//리뷰조회
export const fetchPlaceReview = createAsyncThunk(
  'trip/fetchPlaceReview',
  async ({placeId,placeType}, { rejectWithValue }) => {
    console.log("어디서멈춤", placeId,placeType)
    try {
      const { data } = await getPlaceReview(placeId,placeType);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

//리뷰삭제
export const dropPlaceReview = createAsyncThunk(
  'share/dropPlaceReview',
  async ({ placeType, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await deletePlaceReview(placeType, reviewId);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);