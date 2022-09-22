import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSharedFc,
  createSharedFcComment,
  fetchSharedFcDetail,
  dropSharedFcComment,
  fetchSharedFcLikeList,
} from './shareActions';

const initialState = {
  sharedFcList: null,
  sharedFcInfo: null,
  error: null,
  sharedFcLikeList: null,
};

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {},
  extraReducers: {
    // 공유풀코스 목록 조회
    [fetchSharedFc.fulfilled]: (state, { payload }) => {
      state.sharedFcList = payload.data;
    },
    [fetchSharedFc.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
    // 공유풀코스 상세정보 조회
    [fetchSharedFcDetail.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = payload.data;
    },
    [fetchSharedFcDetail.rejected]: (state, { payload }) => {
      state.error = payload.data;
      console.log(state.error);
    },
    // 공유풀코스 댓글 생성
    [createSharedFcComment.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = {
        ...state.sharedFcInfo,
        sharedFCComments: payload.data,
      };
    },
    [createSharedFcComment.rejected]: (state, { payload }) => {
      state.error = payload.data;
      console.log(state.error);
    },
    // 공유풀코스 댓글 삭제
    [dropSharedFcComment.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = {
        ...state.sharedFcInfo,
        sharedFCComments: payload.data,
      };
    },
    [dropSharedFcComment.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
    // 찜한 풀코스 목록 조회
    [fetchSharedFcLikeList.fulfilled]: (state, { payload }) => {
      state.sharedFcLikeList = payload.data;
      console.log(state.sharedFcLikeList);
    },
    [fetchSharedFcLikeList.rejected]: (state, { payload }) => {
      state.error = payload.data;
      console.log(state.sharedFcLikeList);
    },
  },
});

export default shareSlice.reducer;
