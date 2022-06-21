import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import onlineReducer from "./online-slice";
import postsReducer from "./posts-slice";
import statusModalReducer from "./status-modal-slice";
import toggleModalReducer from "./toggle-modal-slice";
import userReducer from "./user-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      toggleModal: toggleModalReducer,
      statusModal: statusModalReducer,
      posts: postsReducer,
      user: userReducer,
      online: onlineReducer,
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

