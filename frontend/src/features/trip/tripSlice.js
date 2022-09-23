import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: null,
  endDate: null,
  tripDay: null, //여행일수
  tripDates: [], //여행 하루하루 날짜
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
  },
  extraReducers: {},
});

export const { setStartDate, setEndDate, calcTripDay, setDates } =
  tripSlice.actions;

export default tripSlice.reducer;
