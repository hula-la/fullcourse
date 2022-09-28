import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomPlace } from '../../api/survey';

export const fetchRandomPlace = createAsyncThunk(
  'survey/fetchRandomPlace',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await getRandomPlace();
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
