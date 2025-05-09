import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Action
export const fetchTodos = createAsyncThunk("fetchTodos", async (userID) => {
  console.log(userID);
  const response = await axios.post(
    import.meta.env.VITE_API_URL_FETCH_ALL_TODOS_ROUTE,
    userID
  );
  return response.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
