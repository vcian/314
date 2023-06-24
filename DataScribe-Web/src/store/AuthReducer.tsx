import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    isLogin: false
  },
  reducers: {
    onLogIn: (state) => {
      state.isLogin = true;
    },
    onLogOut: (state) => {
      state.isLogin = false;
    }
  }
});

export const { onLogIn, onLogOut } = AuthReducer.actions;
export default AuthReducer.reducer;
