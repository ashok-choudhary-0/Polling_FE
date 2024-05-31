import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  signup: {
    isLoading: false,
    data: null,
    isError: false,
  },
  login: {
    isLoading: false,
    data: null,
    isError: false,
  },
};

export const handleSignup = createAsyncThunk('register', async (signupData) => {
  try {
    const userSignupData = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/register`,
      { ...signupData }
    );
    localStorage.setItem('username', userSignupData?.data?.addUser?.username);
    localStorage.setItem('token', userSignupData?.data?.token);
    return await userSignupData?.data;
  } catch (err) {
    return err?.response;
  }
});

export const handleLogin = createAsyncThunk('login', async (loginData) => {
  try {
    const userLoginData = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/login`,
      { ...loginData }
    );
    localStorage.setItem('username', userLoginData?.data?.addUser?.username);
    localStorage.setItem('token', userLoginData?.data?.token);
    return await userLoginData?.data;
  } catch (err) {
    return err?.response;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleSignup.fulfilled, (state, action) => {
      state.signup.isLoading = false;
      state.signup.data = action.payload?.data;
    });
    builder.addCase(handleSignup.pending, (state, action) => {
      state.signup.isLoading = true;
    });
    builder.addCase(handleSignup.rejected, (state, action) => {
      console.log('Error: ', action.payload);
      state.signup.isError = true;
    });

    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.login.isLoading = false;
      state.login.data = action.payload?.data;
    });
    builder.addCase(handleLogin.pending, (state, action) => {
      state.login.isLoading = true;
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      console.log('Error: ', action.payload);
      state.login.isError = true;
    });
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;
