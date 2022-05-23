import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userId: any;
}

const initialState: userState = {
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<any>) => {
      state.userId = action.payload;
    },
    
  },
});

const userReducer = userSlice.reducer;
export const { setUserId } = userSlice.actions;
export default userReducer;
