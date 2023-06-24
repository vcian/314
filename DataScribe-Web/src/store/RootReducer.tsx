import AuthReducer from "./AuthReducer";
import LoadingReducer from "./LoadingReducer";

export const RootReducer = {
  auth: AuthReducer,
  loading: LoadingReducer
};
