import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./RootReducer";

const store = configureStore({
  reducer: RootReducer
});

export default store;

export interface IRootReducer {
  auth: {
    isLogin: boolean;
  };
  loading: {
    isLoading: boolean;
  };
}
