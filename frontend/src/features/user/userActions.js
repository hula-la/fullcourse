import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo, loginKakao, loginNaver } from '../../api/user';

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
