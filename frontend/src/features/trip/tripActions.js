import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFullcourseDetail, getTravelPlaceList } from '../../api/trip';

//여행명소리스트 불러오기
export const fetchTravelPlace = createAsyncThunk(
  'trip/fetchTravelPlace',
  async (placeType, { rejectWithValue }) => {
    try {
      const { data } = await getTravelPlaceList(placeType);
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
