import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteUser,
  getDiary,
  getMyFullcourse,
  getUserInfo,
  loginKakao,
  loginNaver,
  postDiary,
  updateUserInfo,
} from '../../api/user';

export const userLoginNaver = createAsyncThunk(
  'user/loginNaver',
  async (access_token, { rejectWithValue }) => {
    try {
      const { data } = await loginNaver({ access_token });
      localStorage.setItem('accessToken', data['token']);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLoginKakao = createAsyncThunk(
  'user/loginKakao',
  async (access_token, { rejectWithValue }) => {
    try {
      const { data } = await loginKakao({ access_token });
      localStorage.setItem('accessToken', data['token']);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (temp, { rejectWithValue }) => {
    try {
      const { data } = await getUserInfo();
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

export const fetchMyFullcourse = createAsyncThunk(
  'user/fetchMyfullcourse',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await getMyFullcourse();
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

export const putUserInfo = createAsyncThunk(
  'user/putUserInfo',
  async ({ userNickname, imgFile }, { rejectWithValue }) => {
    try {
      const { data } = await updateUserInfo(
        { nickname: userNickname },
        imgFile,
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

export const eraseUser = createAsyncThunk(
  'user/eraseUser',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await deleteUser();
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

export const fetchDiary = createAsyncThunk(
  'user/fetchDiary',
  async (fcId, { rejectWithValue }) => {
    try {
      const { data } = await getDiary(fcId);
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

export const createDiary = createAsyncThunk(
  'user/createDiary',
  async ({ img, content, fcDetailId }, { rejectWithValue }) => {
    try {
      const { data } = await postDiary(img, content, fcDetailId);
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
