import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { images } from "../../../assets/images";
import { onLogOut } from "../../../store/AuthReducer";

const ChatSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirect = (url: string) => {
    navigate(url);
  };

  const handleLogout = () => {
    dispatch(onLogOut());
  };
  const array = [
    {
      font: images.chatIcon,
      label: "My Workspace",
      onClick: () => handleRedirect("/chat")
    },
    {
      font: images.perviousIcon,
      label: "Previous Chats",
      onClick: () => handleRedirect("/create-workspace")
    },
    {
      font: images.logoutIcon,
      label: "Logout",
      onClick: () => handleLogout()
    }
  ];
  return (
    <div className="chat-sidebar p-20">
      <div className="d-flex align-items-center mb-20">
        <img src={images.logo} width={40} />
        <h4 className="ml-10 mb-0 c-black">
          <span className="fw-bold">Data</span>Scribe
        </h4>
      </div>
      <div>
        {array.map((res, index) => (
          <div key={index} onClick={res.onClick} className={`sidebar-link ${index === 0 ? "sidebar-link-active" : ""} mt-10`}>
            <img src={res.font} width={25} alt="icon" />
            <p className="mb-0 ml-20">{res.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
