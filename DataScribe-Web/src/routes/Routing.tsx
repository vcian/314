import { Navigate, Outlet, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Chat from "../pages/chat/Chat";
import WorkSpace from "../pages/workspace/WorkSpace";

export const PrivateRoutesArray: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/demo",
        element: <Home />
      },
      {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/create-workspace",
        element: <WorkSpace />
      },
      { path: "*", element: <Navigate to={"/chat"} /> }
    ]
  }
];
export const PublicRoutesArray: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Login /> },
      { path: "*", element: <Navigate to={"/login"} /> }
    ]
  }
];
