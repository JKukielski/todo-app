import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import filterReducer from "../slices/filtersSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    filter: filterReducer,
  },
});
