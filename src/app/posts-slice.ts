import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postsState {
  limit: number;
}

const initialState: postsState = {
  limit: 5,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<any>) => {
      state.limit = action.payload.limit;
    },
  },
});

const postsReducer = postsSlice.reducer;
export const { setLimit } = postsSlice.actions;
export default postsReducer;
