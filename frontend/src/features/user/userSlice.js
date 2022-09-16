import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './userActions';

const initialState = {
  userInfo: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.userInfo = null;
    },
  },
  extraReducers: {
    [fetchUserInfo.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
    },
    [fetchUserInfo.rejected]: (state, { payload }) => {
      state.error = payload.data;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
