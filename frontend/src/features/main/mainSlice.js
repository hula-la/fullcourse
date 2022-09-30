import { createSlice } from '@reduxjs/toolkit';
import { fetchSharedFc } from './mainActions';

const initialState = {
  sharedFcList: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSharedFc.fulfilled]: (state, { payload }) => {
      state.sharedFcList = payload.data;
      console.log(payload);
    },
    [fetchSharedFc.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
  },
});

export default mainSlice.reducer;
