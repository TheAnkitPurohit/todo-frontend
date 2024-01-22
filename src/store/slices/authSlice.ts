/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
export interface AuthState {
  token: null | string;
  refreshToken: null | string;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: () => initialState,
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      state.token = access;
      state.refreshToken = refresh;
    },
  },
});

export const { setCredentials, resetState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
