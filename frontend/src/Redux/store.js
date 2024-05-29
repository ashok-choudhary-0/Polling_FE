import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/slices/authSlice';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
});
