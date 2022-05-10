import { createSlice } from "@reduxjs/toolkit";

interface toggleModalState {
  openSetting: boolean;
  openNotify: boolean;
}

const initialState: toggleModalState = {
  openSetting: false,
  openNotify: false,
};

const toggleModalSlice = createSlice({
  name: "toggleModal",
  initialState,
  reducers: {
    toggleNotify: (state) => {
      state.openNotify = !state.openNotify;
      state.openSetting = false;
    },
    toggleSetting: (state) => {
      state.openSetting = !state.openSetting;
      state.openNotify = false;
    },

    closeModal: (state) => {
      state.openSetting = false;
      state.openNotify = false;
    },
  },
});

const toggleModalReducer = toggleModalSlice.reducer;
export const { toggleNotify, toggleSetting, closeModal } =
  toggleModalSlice.actions;
export default toggleModalReducer;
