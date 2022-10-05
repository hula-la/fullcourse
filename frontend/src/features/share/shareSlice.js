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
  errorCode: null,
  errorMessage: null,
  sharedFcLikeList: null,
  tagList: [
    ['키워드', '필수', '핫플', '야경', '인생샷명소', '뷰맛집', '맛집'],

    ['어디로', '시장', '실내', '놀이공원', '박물관', '산책로', '부산바다'],

    [
      '무엇을',
      '역사',
      '문화예술',
      '체험',
      '액티비티',
      '등산',
      '쇼핑',
      '스포츠',
      '드라이브',
    ],
    [
      '어떻게',
      '초록초록',
      '노을',
      '한적한',
      '흥미로운',
      '교육적인',
      '걷기좋은',
      '북적이는',
    ],

    ['누구와', '혼자', '친구와', '연인과', '아이와', '부모님과', '가족과'],

    ['언제', '봄', '여름', '가을', '겨울'],
  ],
  dayTagList: ['일수', '1DAY', '2DAY', '3DAY', '4DAY', '5DAY'],
  dayTagList2: [],
  checkedTagList: [],
  checkedDayTagList: [],
  checkedDay: 6,
  howSort: 'regDate,desc',
  willShareFcId: null,
  willShareThumbnail: null,
  moveLat: null,
  moveLng: null,
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
        state.checkedTagList = [...state.checkedTagList, payload];
      }
    },
    checkDayTag: (state, { payload }) => {
      const day = payload.slice(0, 1);
      if (state.checkedDayTagList.includes(day)) {
        const tmp = state.checkedDayTagList.filter((el) => el !== day);
        state.checkedDayTagList = tmp;
      } else {
        state.checkedDayTagList = [...state.checkedDayTagList, day];
      }
    },
    makeDayTagList: (state, { payload }) => {
      const tmp = [];
      for (let i = 1; i <= parseInt(payload); i++) {
        tmp.push(i + 'Day');
      }
      state.dayTagList2 = tmp;
    },
    checkDay: (state, { payload }) => {
      state.checkedDay = payload;
    },
    checkAllDay: (state) => {
      state.checkedDay = 6;
    },
    selectSort: (state, { payload }) => {
      state.howSort = payload + ',desc';
    },
    selectFcId: (state, { payload }) => {
      state.willShareFcId = payload.fcId;
      state.willShareThumbnail = payload.thumbnail;
    },
    resetError: (state) => {
      state.errorCode = null;
      state.errorMessage = null;
    },
    moveMap: (state, { payload }) => {
      console.log(payload);
      state.moveLat = payload.lat;
      state.moveLng = payload.lng;
    },
  },
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
    },
    [fetchSharedFcLikeList.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
    // 공유 풀코스 좋아요
    [createSharedFcLike.fulfilled]: (state, { payload }) => {
      state.sharedFcInfo = {
        ...state.sharedFcInfo,
        like: payload.data.like,
        likeCnt: payload.data.likeCnt,
      };
    },
    [createSharedFcLike.rejected]: (state, { payload }) => {
      state.errorCode = payload.statusCode;
      state.errorMessage = payload.message;
    },
    // 나의 공유풀코스 목록 조회
    [fetchMySharedFc.fulfilled]: (state, { payload }) => {
      state.mySharedFcList = payload.data;
    },
  },
});

export const {
  checkTag,
  checkDayTag,
  makeDayTagList,
  checkDay,
  checkAllDay,
  selectSort,
  selectFcId,
  resetError,
  moveMap,
} = shareSlice.actions;

export default shareSlice.reducer;
