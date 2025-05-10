import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTodoApiCall = createAsyncThunk(
  "deleteTodoApiCall",

  async ({ todoID, userID }) => {
    console.log(todoID, userID);
    const response = await axios.delete(
      import.meta.env.VITE_API_URL_DELETE_TODO_ROUTE,
      {
        data: { userID, todoID },
      }
    );

    return response.data;
  }
);

const deleteTodoSlice = createSlice({
  name: "deleteTodo",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTodoApiCall.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodoApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteTodoApiCall.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default deleteTodoSlice.reducer;
