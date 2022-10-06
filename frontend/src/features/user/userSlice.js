import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo, putUserInfo } from './userActions';

const initialState = {
  userInfo: null,
  error: null,
  statusCode: null,
  diaryInfo: null,
  showMemo: { first: 0, last: 0 },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.clear();
      state.userInfo = null;
    },
    changeShowMemo: (state, { payload }) => {
      state.showMemo = { ...state.showMemo, ...payload };
      console.log(payload);
    },
  },
  extraReducers: {
    // 유저정보 조회
    [fetchUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    [fetchUserInfo.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
    [putUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    [putUserInfo.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
  },
});

export const { logout, changeShowMemo } = userSlice.actions;

export default userSlice.reducer;
