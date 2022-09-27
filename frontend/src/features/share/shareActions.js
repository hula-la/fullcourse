import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteSharedFcComment,
  getMySharedFc,
  getSharedFc,
  getSharedFcDetail,
  getSharedFcLikeList,
  postSharedFc,
  postSharedFcComment,
  postSharedFcLike,
} from '../../api/share';

export const fetchSharedFc = createAsyncThunk(
  'share/fetchSharedFc',
  async (
    { checkedTagList, checkedDayTagList, place, pageNum },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await getSharedFc(
        {
          tags: checkedTagList,
          days: checkedDayTagList,
          place,
        },
        pageNum,
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchSharedFcDetail = createAsyncThunk(
  'share/fetchSharedFcDetail',
  async ({ sharedFcId, email }, { rejectWithValue }) => {
    try {
      const { data } = await getSharedFcDetail(sharedFcId, email);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createSharedFc = createAsyncThunk(
  'share/createSharedFc',
  async (sharedFcPostReq, { rejectWithValue }) => {
    console.log(sharedFcPostReq);
    try {
      const { data } = await postSharedFc(sharedFcPostReq);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createSharedFcComment = createAsyncThunk(
  'share/createSharedFcComment',
  async ({ comment, sharedFcId }, { rejectWithValue }) => {
    try {
      const { data } = await postSharedFcComment({
        comment,
        sharedFcId,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const dropSharedFcComment = createAsyncThunk(
  'share/dropSharedFcComment',
  async ({ sharedFcId, commentId }, { rejectWithValue }) => {
    try {
      const { data } = await deleteSharedFcComment(sharedFcId, commentId);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchSharedFcLikeList = createAsyncThunk(
  'share/fetchSharedFcLikeList',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await getSharedFcLikeList();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createSharedFcLike = createAsyncThunk(
  'share/createSharedFcLike',
  async (sharedFcId, { rejectWithValue }) => {
    try {
      const { data } = await postSharedFcLike(sharedFcId);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchMySharedFc = createAsyncThunk(
  'share/fetchMySharedFc',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await getMySharedFc();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
