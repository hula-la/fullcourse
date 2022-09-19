import { createSlice } from '@reduxjs/toolkit';
import { fetchSharedFc } from './shareActions';

const initialState = {
  sharedFcInfo: null,
  error: null,
};

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSharedFc.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = payload.data;
    },
    [fetchSharedFc.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
  },
});

export default shareSlice.reducer;
