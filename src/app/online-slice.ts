import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface onlineState {
  online: any;
}

const initialState: onlineState = {
  online: [],
};

const onlineSlice = createSlice({
  name: "online",
  initialState,
  reducers: {
    setOnline: (state, action: PayloadAction<any>) => {
      state.online = [...state.online, action.payload];
    },
    setOffine: (state, action: PayloadAction<any>) => {
      state.online = state.online.filter(
        (item: any) => item !== action.payload
      );
    },
    checkOnOff: (state, action: PayloadAction<any>) => {
      state.online = state.online.map((item: any) => {
          console.log(item)
        action.payload.includes(item);

      });
    },
  },
});

const onlineReducer = onlineSlice.reducer;
export const { setOnline, setOffine } = onlineSlice.actions;
export default onlineReducer;
