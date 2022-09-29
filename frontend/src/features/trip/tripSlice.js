import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFullcourseDetail,
  fetchTravelPlace,
  createTrip,
} from './tripActions';
import format from 'date-fns/format';

const initialState = {
  regDate: format(new Date(), 'yyyy-MM-dd'),
  startDate: null,
  endDate: null,
  tripDay: null, //여행일수
  tripDates: [], //여행 하루하루 날짜
  travelPlaceList: null, //여행명소리스트 //null이랑 빈배열로 받는거랑 무슨차일까
  placeItem: [],

  trip: null, //전체 여행일정
  map: null, //초기맵을 저장하고 싶은데 이게 작동이 되는지 잘 모르겟음 이상하게 저장되는 듯
  markers: [], //마커

  fullcourseDetail: { places: null },
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = format(action.payload, 'yyyy-MM-dd');
    },
    setEndDate: (state, action) => {
      state.endDate = format(action.payload, 'yyyy-MM-dd');
    },
    calcTripDay: (state, action) => {
      state.tripDay = action.payload;
    },
    setDates: (state, action) => {
      state.tripDates = action.payload;
    },
    setPlaceItem: (state, action) => {
      console.log("setPlaceItem")
      state.placeItem.push(action.payload);
    },
    setInitMap: (state, action) => {
      //일단 만들어는 놨는데 현재는 쓰는 곳이 없음//props로 해결중
      state.map = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers.push(action.payload);
    },
    clearMarkers: (state, action) => {
      state.markers = [];
      console.log('성공?', state.markers);
    },
  },
  extraReducers: {
    //여행명소 리스트 목록 조회
    [fetchTravelPlace.fulfilled]: (state, { payload }) => {
      state.travelPlaceList = payload.data;
      console.log("이게되나", payload.data)
      
    },
    [fetchTravelPlace.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
    // 상세 풀코스 정보 조회
    [fetchFullcourseDetail.fulfilled]: (state, { payload }) => {
      state.fullcourseDetail = payload.data;
      console.log(state.fullcourseDetail);
    },
    [fetchFullcourseDetail.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
    [createTrip.fulfilled]: (state, { payload }) => {
      state.trip = payload.data;
    },
    [createTrip.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  calcTripDay,
  setDates,
  setPlaceItem,
  setInitMap,
  setMarkers,
  clearMarkers,
} = tripSlice.actions;

export default tripSlice.reducer;
