import { createSlice } from '@reduxjs/toolkit';
import { fetchTravelPlace } from './tripActions';

const initialState = {
  startDate: null,
  endDate: null,
  tripDay: null, //여행일수
  tripDates: [], //여행 하루하루 날짜
  travelPlaceList: null, //여행명소리스트 //null이랑 빈배열로 받는거랑 무슨차일까
  placeItem: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
      console.log(action.payload);
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    calcTripDay: (state, action) => {
      state.tripDay = action.payload;
    },
    setDates: (state, action) => {
      state.tripDates = action.payload;
    },
    setPlaceItem: (state, action) => {
      console.log('뭐담기지', action.payload);
      console.log('이게뭐임', state.placeItem);
      state.placeItem.push(action.payload);
    },
    deletePlaceItem: (state, action) => {
      console.log('아이디잘담기나', action.payload);
      let placeItemList = state.placeItem;
      for (var i = 0; i < placeItemList.length; i++) {
        if (i === action.payload) {
          // 값이 같은 배열 인덱스 확인
          placeItemList.splice(i, 1);
        }
      }
    },
  },
  extraReducers: {
    //여행명소 리스트 목록 조회
    [fetchTravelPlace.fulfilled]: (state, { payload }) => {
      state.travelPlaceList = payload.data.content;
    },
    [fetchTravelPlace.rejected]: (state, { payload }) => {
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
  deletePlaceItem,
} = tripSlice.actions;

export default tripSlice.reducer;
