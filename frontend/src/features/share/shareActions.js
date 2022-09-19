import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSharedFc, postSharedFc } from '../../api/share';

export const fetchSharedFc = createAsyncThunk(
  'share/fetchSharedFc',
  async (sharedFcId, { rejectWithValue }) => {
    try {
      const { data } = await getSharedFc(sharedFcId);
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
