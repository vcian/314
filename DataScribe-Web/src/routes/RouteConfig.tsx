import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cookieKeys } from "../constants/constants";
import LoaderComponent from "../pages/LoaderComponent";
import { IRootReducer } from "../store";
import { onLogIn, onLogOut } from "../store/AuthReducer";
import { getEncryptedCookie } from "../utils/CommonFuncation";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const RouteConfig = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: IRootReducer) => state.auth);
  const { isLoading } = useSelector((state: IRootReducer) => state.loading);

  // login check function
  const checkUserLoginAndSetCookies = () => {
    const cookieUser = getEncryptedCookie(cookieKeys.cookieUser);
    if (cookieUser) {
      dispatch(onLogIn);
    } else {
      dispatch(onLogOut);
    }
  };
  useEffect(() => {
    checkUserLoginAndSetCookies();
  }, [dispatch]);

  return (
    <>
      {isLoading && <LoaderComponent />}
      {isLogin ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  );
};

export default RouteConfig;
