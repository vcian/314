import { useRoutes } from "react-router-dom";
import { PublicRoutesArray } from "./Routing";

const PublicRoutes = () => {
  const PublicRoute = useRoutes(PublicRoutesArray);
  return <>{PublicRoute}</>;
};

export default PublicRoutes;
