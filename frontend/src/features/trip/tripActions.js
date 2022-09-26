
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getTravelPlaceList, postTrip } from '../../api/trip';
//여행명소리스트 불러오기
export const fetchTravelPlace = createAsyncThunk(
  'trip/fetchTravelPlace',
  async ( placeType, { rejectWithValue }) => {
    try {
      const { data } = await getTravelPlaceList(placeType
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

//여행일정생성
export const createTrip = createAsyncThunk(
  'trip/createTrip',
  async (createTripPostReq, { rejectWithValue }) => {
    console.log("POSTREQ",createTripPostReq);
    try {
      const { data } = await postTrip(createTripPostReq);
      console.log("여행일정생성성공",data)
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
