import { createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from "../constants/constants";
import { getDecryptedLocalStorage } from "../utils/CommonFuncation";

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: {
    user: getDecryptedLocalStorage(localStorageKeys.userToken) ? getDecryptedLocalStorage(localStorageKeys.userToken) : ""
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setUserData } = UserReducer.actions;
export default UserReducer.reducer;
