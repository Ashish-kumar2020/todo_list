import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";
import createTodoReducer from "../slice/createTodoSlice";
import deleteTodoReducer from "../slice/deleteTodoSlice";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    createTodo: createTodoReducer,
    deleteTodo: deleteTodoReducer,
  },
});
