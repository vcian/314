import AuthReducer from "./AuthReducer";
import LoadingReducer from "./LoadingReducer";
import UserReducer from "./UserReducer";

export const RootReducer = {
  auth: AuthReducer,
  loading: LoadingReducer,
  userData: UserReducer
};
