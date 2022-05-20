import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface postsState {
  limit: number;
  postData: any
}

const initialState: postsState = {
  limit: 15,
  postData: {}
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<any>) => {
      state.limit = action.payload.limit;
    },
    setPostData:(state, action: PayloadAction<any>) => {
      state.postData = action.payload;
    },
  },
});

const postsReducer = postsSlice.reducer;
export const { setLimit,setPostData } = postsSlice.actions;
export default postsReducer;
