import { images } from "../../../assets/images";

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="d-flex align-items-center">
        <p className="mb-0 mr-10 c-black fw-bold">Parmar Mayur</p>
        <img src={images.user} alt="user" />
      </div>
    </div>
  );
};

export default ChatHeader;
