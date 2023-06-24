import { useSelector } from "react-redux";
import { IRootReducer } from "../store";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const RouteConfig = () => {
  const { isLogin } = useSelector((state: IRootReducer) => state.auth);

  return <>{isLogin ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default RouteConfig;
