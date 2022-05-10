import { createSlice } from "@reduxjs/toolkit";

interface themeState {}

const initialState: themeState = {};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
});

const themeReducer = themeSlice.reducer;
export const {} = themeSlice.actions;
export default themeReducer;
