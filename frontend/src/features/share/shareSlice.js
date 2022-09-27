import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSharedFc,
  createSharedFcComment,
  fetchSharedFcDetail,
  dropSharedFcComment,
  fetchSharedFcLikeList,
  createSharedFcLike,
  fetchMySharedFc,
} from './shareActions';

const initialState = {
  sharedFcList: null,
  mySharedFcList: null,
  sharedFcInfo: null,
  error: null,
  sharedFcLikeList: null,
  tagList: [
    '산',
    '바다',
    '힐링',
    '계곡',
    '핫플',
    '현지맛집',
    '돼지국밥',
    '산책',
    '데이트',
    '맛집',
  ],
  dayTagList: ['1DAY', '2DAY', '3DAY', '4DAY', '5DAY'],
  checkedTagList: [],
  checkedDayTagList: [],
};

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    checkTag: (state, { payload }) => {
      if (state.checkedTagList.includes(payload)) {
        const tmp = state.checkedTagList.filter((el) => el !== payload);
        state.checkedTagList = tmp;
      } else {
        const tmp = [...state.checkedTagList, payload];
        state.checkedTagList = tmp;
      }
    },
    checkDayTag: (state, { payload }) => {
      const day = payload.slice(0, 1);
      if (state.checkedDayTagList.includes(day)) {
        const tmp = state.checkedDayTagList.filter((el) => el !== day);
        state.checkedDayTagList = tmp;
      } else {
        const tmp = [...state.checkedDayTagList, day];
        state.checkedDayTagList = tmp;
      }
    },
  },
  extraReducers: {
    // 공유풀코스 목록 조회
    [fetchSharedFc.fulfilled]: (state, { payload }) => {
      state.sharedFcList = payload.data;
      console.log(payload);
    },
    [fetchSharedFc.rejected]: (state, { payload }) => {
      state.error = payload.error;
    },
    // 공유풀코스 상세정보 조회
    [fetchSharedFcDetail.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = payload.data;
      console.log(state.sharedFcInfo);
    },
    [fetchSharedFcDetail.rejected]: (state, { payload }) => {
      state.error = payload.data;
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
    // 공유 풀코스 좋아요
    [createSharedFcLike.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = {
        ...state.sharedFcInfo,
        like: payload.data,
      };
    },
    // 나의 공유풀코스 목록 조회
    [fetchMySharedFc.fulfilled]: (state, { payload }) => {
      state.mySharedFcList = payload.data;
    },
  },
});

export const { checkTag, checkDayTag } = shareSlice.actions;

export default shareSlice.reducer;
