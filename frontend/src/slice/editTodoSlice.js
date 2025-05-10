import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const editTodoApiCall = createAsyncThunk(
  "editTodoApiCall",
  async (todoDetails) => {
    console.log("TODODETAILS", todoDetails);
    const response = await axios.put(
      import.meta.env.VITE_API_URL_EDIT_TODO_ROUTE,
      todoDetails
    );

    return response.data;
  }
);

const editTodoSlice = createSlice({
  name: "editTodo",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },

  extraReducers: (builder) => {
    builder.addCase(editTodoApiCall.pending, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(editTodoApiCall.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(editTodoApiCall.rejected, (state, action) => {
      console.log("Error :", action.payload);
      state.isError = true;
    });
  },
});

export default editTodoSlice.reducer;
