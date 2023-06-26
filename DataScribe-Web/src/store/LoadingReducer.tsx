import { createSlice } from "@reduxjs/toolkit";

const LoadingReducer = createSlice({
  name: "LoadingReducer",
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, actions) => {
      state.isLoading = actions.payload;
    }
  }
});

export const { setLoading } = LoadingReducer.actions;

export default LoadingReducer.reducer;
