import { createSlice } from "@reduxjs/toolkit";
import { cookieKeys } from "../constants/constants";
import { getEncryptedCookie, handleLogout } from "../utils/CommonFuncation";

const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState: {
    isLogin: getEncryptedCookie(cookieKeys.cookieUser) ? true : false
  },
  reducers: {
    onLogIn: (state) => {
      state.isLogin = true;
    },
    onLogOut: (state) => {
      handleLogout();
      state.isLogin = false;
    }
  }
});

export const { onLogIn, onLogOut } = AuthReducer.actions;
export default AuthReducer.reducer;
