import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaceTravel } from '../../api/ar';

export const fetchPlaceTravel = createAsyncThunk(
    'ar/fetchPlaceTravel',
    async (tmp, { rejectWithValue }) => {
        try {
            const { data } = await getPlaceTravel()
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue(error.message);
            }
          }
    }
)