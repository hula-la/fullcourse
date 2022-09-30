import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSharedFc } from '../../api/main';

export const fetchSharedFc = createAsyncThunk(
  'main/fetchSharedFc',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await getSharedFc();
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
