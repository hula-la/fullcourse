import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFullcourseDetail,
  getTravelPlaceList,
  postTrip,
  getPlaceDetail,
  postPlaceLike,
  postReview,
  postDiary,
  getPlaceReview,
  deletePlaceReview,
  deleteFc
} from '../../api/trip';

//여행명소리스트 불러오기
export const fetchTravelPlace = createAsyncThunk(
  'trip/fetchTravelPlace',
  async (
    { placeType, pageNum, sortReq, keyword, maxDist, recentLat, recentLng },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await getTravelPlaceList(
        placeType,
        pageNum,
        sortReq,
        keyword,
        maxDist,
        recentLat,
        recentLng,
      );

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
    try {
      const { data } = await postTrip(createTripPostReq);
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
  async ({ placeId, placeType }, { rejectWithValue }) => {
    try {
      const { data } = await getPlaceDetail(placeId, placeType);
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
  async ({ placeId, placeType }, { rejectWithValue }) => {
    try {
      const { data } = await postPlaceLike(placeId, placeType);
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
  async (
    { imageFile, reviewComment, value, placeId, placeType },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await postReview(
        imageFile,
        reviewComment,
        value,
        placeId,
        placeType,
      );
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

export const createDiary = createAsyncThunk(
  'user/createDiary',
  async ({ img, content, fcDetailId }, { rejectWithValue }) => {
    try {
      const { data } = await postDiary(img, content, fcDetailId);
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
  async ({ placeId, placeType }, { rejectWithValue }) => {
    try {
      const { data } = await getPlaceReview(placeId, placeType);
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
  'trip/dropPlaceReview',
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
//풀코스삭제
export const dropFc = createAsyncThunk(
  'trip/dropFc',
  async (fcId, { rejectWithValue }) => {
    try {
      const { data } = await deleteFc(fcId);
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
