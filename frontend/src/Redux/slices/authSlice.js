import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  signup: {
    isLoading: false,
    data: null,
    isError: false,
  },
};

export const handleSignup = createAsyncThunk('register', async (signupData) => {
  try {
    const userSignupData = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/register`,
      signupData
    );
    localStorage.setItem('username', userSignupData?.data?.addUser?.username);
    return userSignupData?.data;
  } catch (err) {
    console.log(err);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleSignup.fulfilled, (state, action) => {
      state.signup.isLoading = false;
      state.signup.data = action.payload;
    });
    builder.addCase(handleSignup.pending, (state, action) => {
      state.signup.isLoading = true;
    });
    builder.addCase(handleSignup.rejected, (state, action) => {
      console.log('Error: ', action.payload)((state.signup.isError = true));
    });
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;
