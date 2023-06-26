import { useLocation, useRoutes } from "react-router-dom";
import ChatHeader from "../pages/chat/chatHeaer/ChatHeader";
import ChatSidebar from "../pages/chat/chatSidebar/ChatSidebar";
import "../styles/chat.scss";
import { PrivateRoutesArray } from "./Routing";

const PrivateRoutes = () => {
  const homeRoutes = "/";
  const location = useLocation();
  const privateRoute = useRoutes(PrivateRoutesArray);

  if (location?.pathname === homeRoutes) {
    return <>{privateRoute}</>;
  }

  return (
    <div className="chat-main-section">
      <ChatSidebar />
      <div className="chat-section">
        <ChatHeader />
        {privateRoute}
      </div>
    </div>
  );
};

export default PrivateRoutes;
