import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const createTodoApiCall = createAsyncThunk(
  "createTodoApiCall",
  async (todoDetails) => {
    console.log(todoDetails);
    const response = await axios.post(
      import.meta.env.VITE_API_URL_CREATE_TODO_ROUTE,
      todoDetails
    );
    return response.data;
  }
);

const createTodoSlice = createSlice({
  name: "createTodo",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createTodoApiCall.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createTodoApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(createTodoApiCall.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default createTodoSlice.reducer;
