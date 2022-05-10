import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import toggleModalReducer from "./toggle-modal-slice";
import statusModalReducer from "./status-modal-slice";
import postsReducer from "./posts-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      toggleModal: toggleModalReducer,
      statusModal: statusModalReducer,
      posts: postsReducer
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
