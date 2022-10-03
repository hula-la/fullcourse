import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDiary,
  fetchMyFullcourse,
  fetchUserInfo,
  putUserInfo,
} from './userActions';

const initialState = {
  userInfo: null,
  error: null,
  myFullcourseList: null,
  diaryInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.clear();
      state.userInfo = null;
    },
  },
  extraReducers: {
    // 유저정보 조회
    [fetchUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    [fetchUserInfo.rejected]: (state, { payload }) => {
      state.error = payload.data;
      // 나의 풀코스 목로 조회
    },
    [fetchMyFullcourse.fulfilled]: (state, { payload }) => {
      state.myFullcourseList = payload.data;
      console.log(state.myFullcourseList);
    },
    [fetchMyFullcourse.rejected]: (state, { payload }) => {
      state.error = payload.data;
      // 회원정보 수정
    },
    [putUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    [putUserInfo.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
    // 다이어리 받아오기
    [fetchDiary.fulfilled]: (state, { payload }) => {
      state.diaryInfo = payload.data;
    },
    [fetchDiary.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
