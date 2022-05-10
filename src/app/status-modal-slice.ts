import { IPost } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface statusModalState {
  showModal: boolean;
  postEdit: any;
}

const initialState: statusModalState = {
  showModal: false,
  postEdit: {},
};

const statusModalSlice = createSlice({
  name: "statusModal",
  initialState,
  reducers: {
    openStatus: (state) => {
      state.showModal = true;
    },
    openStatusEdit: (state, action: PayloadAction<IPost>) => {
      state.showModal = true;
      state.postEdit = action.payload;
    },
    closeStatus: (state) => {
      state.showModal = false;
      state.postEdit = null
    },
  },
});

const statusModalReducer = statusModalSlice.reducer;
export const { openStatus, openStatusEdit, closeStatus } =
  statusModalSlice.actions;
export default statusModalReducer;
