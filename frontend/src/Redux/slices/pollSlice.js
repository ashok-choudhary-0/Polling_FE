import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allpolls: {
    isLoading: false,
    data: null,
    isError: false,
  },
};

export const handleAllPolls = createAsyncThunk('allpolls', async (payload) => {
  try {
    const headers = {
      token: localStorage.getItem('token'),
    };
    const allpolls = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/poll/list`,
      { headers },
      {
        params: {
          page: payload?.page ?? 1,
          pollLimit: payload?.limit ?? 10,
        },
      }
    );
    console.log(allpolls, "=============== slice")
    return await allpolls?.data;
  } catch (err) {
    return err?.response;
  }
});

export const pollSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleAllPolls.fulfilled, (state, action) => {
      state.allpolls.isLoading = false;
      state.allpolls.data = action.payload?.data;
    });
    builder.addCase(handleAllPolls.pending, (state, action) => {
      state.allpolls.isLoading = true;
    });
    builder.addCase(handleAllPolls.rejected, (state, action) => {
      console.log('Error: ', action.payload);
      state.allpolls.isError = true;
    });
  },
});

export default pollSlice.reducer;
