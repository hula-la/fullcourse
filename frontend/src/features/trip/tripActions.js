import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFullcourseDetail, getTravelPlaceList, postTrip, getPlaceDetail } from '../../api/trip';

//여행명소리스트 불러오기
export const fetchTravelPlace = createAsyncThunk(
  'trip/fetchTravelPlace',
  async ({placeType,pageNum}, { rejectWithValue }) => {
    try {
      const { data } = await getTravelPlaceList(placeType,pageNum);
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
    try {
      const { data } = await postTrip(createTripPostReq);
      alert("일정생성에 성공했다네!!")
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
