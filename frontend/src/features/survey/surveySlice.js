import { createSlice } from '@reduxjs/toolkit';
import { fetchRandomPlace } from './surveyActions';

const initialState = {
  randomPlaceList: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRandomPlace.fulfilled]: (state, { payload }) => {
      state.randomPlaceList = payload.data;
    },
  },
});

export default surveySlice.reducer;
