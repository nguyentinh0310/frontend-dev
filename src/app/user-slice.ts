import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  userData: any
}

const initialState: userState = {
  userData: {}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData:(state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setUserData } = userSlice.actions;
export default userReducer;
