import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: new Date(),
  endDate: null,
  tripDay: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setTripDay: (state, action) => {
      state.tripDay = action.payload;
    },
  },
  extraReducers: {},
});

export const { setStartDate, setEndDate, setTripDay } = tripSlice.actions

export default tripSlice.reducer;
