import { FC } from "react";
import { images } from "../../../assets/images";

interface IChatSend {
  data: any;
}

const ChatSend: FC<IChatSend> = ({ data }) => {
  return (
    <div className="chat-send d-flex mt-20">
      <div className="chat-send-img">
        <img className="profile-img" src={images.user} alt="user" />
      </div>
      <div className="chat-send-que">
        <p className="mb-0 fw-bold c-black">{data}</p>
      </div>
    </div>
  );
};

export default ChatSend;
