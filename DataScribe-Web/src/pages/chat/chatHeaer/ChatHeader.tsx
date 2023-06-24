import { useSelector } from "react-redux";
import { images } from "../../../assets/images";
import { IRootReducer } from "../../../store";

const ChatHeader = () => {
  const { user } = useSelector((state: IRootReducer) => state.userData);
  return (
    <div className="chat-header">
      <div className="d-flex align-items-center">
        <p className="mb-0 mr-10 c-black fw-bold">{user?.firstName}</p>
        <img src={images.user} alt="user" />
      </div>
    </div>
  );
};

export default ChatHeader;
