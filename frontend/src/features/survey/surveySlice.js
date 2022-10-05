import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomPlace, fetchRecommendPlace } from './surveyActions';

const initialState = {
  randomPlaceList: [],
  recommendPlaceList: [],
  likePlaceList: [],
  likePlaceIndex: [],
  number: 0,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setNumber: (state, { payload }) => {
      console.log(payload);
  state.number = payload;
    },
    likePlace: (state, { payload }) => {
      state.likePlaceList = [...state.likePlaceList, payload];
      state.likePlaceIndex = [...state.likePlaceIndex, payload.placeId];
    },
    deletePlace: (state, { payload }) => {
      state.likePlaceList = state.likePlaceList.filter(place => place.placeId != payload.placeId);
      state.likePlaceIndex = state.likePlaceIndex.filter(id => id != payload.placeId);
    },
    passPlace: (state, { payload }) => {
      state.number += 1;
    },
  },
  extraReducers: {
    // 랜덤한 장소 불러오기
    [fetchRandomPlace.fulfilled]: (state, { payload }) => {
      state.randomPlaceList = payload.data;
    },
    [fetchRandomPlace.rejected]: (state, { payload }) => {
      state.randomPlaceList = payload.data;
    },
    // 추천 장소 불러오기
    [fetchRecommendPlace.fulfilled]: (state, { payload }) => {
      state.recommendPlaceList = payload.data;
    },
    [fetchRecommendPlace.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
  },
});

export const { likePlace, passPlace,deletePlace,setNumber } = surveySlice.actions;

export default surveySlice.reducer;
