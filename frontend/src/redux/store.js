import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";
import createTodoReducer from "../slice/createTodoSlice";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    createTodo: createTodoReducer,
  },
});
