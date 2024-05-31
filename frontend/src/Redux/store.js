import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/slices/authSlice';
import pollReducer from '../Redux/slices/pollSlice';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    pollReducer: pollReducer,
  },
});
