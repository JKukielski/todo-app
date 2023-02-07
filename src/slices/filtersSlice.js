import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterStatus: "all",
  filterCategory: "all",
};

export const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { updateFilterCategory, updateFilterStatus } =
  filtersSlice.actions;

export default filtersSlice.reducer;
