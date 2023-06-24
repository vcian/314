import { useState } from "react";
import { Input } from "reactstrap";
import { images } from "../../assets/images";
import "../../styles/chat.scss";
import ChatReply from "./components/ChatReply";
import ChatSend from "./components/ChatSend";

const Chat = () => {
  const [chatData, setChatData] = useState([
    {
      type: "send",
      message: "dsad"
    },
    {
      type: "reply",
      message: "dsds"
    }
  ]);
  return (
    <div className="chat-body">
      <div className=" chat-body-output-main d-flex justify-content-center">
        <div className="chat-body-output">
          {chatData?.map((res) => (
            <div className="w-100">{res?.type === "send" ? <ChatSend data={res.message} /> : <ChatReply />}</div>
          ))}
        </div>
      </div>
      <div className="chat-body-input">
        <div className="w-100 d-flex align-items-center justify-content-center">
          <Input className="p-10" placeholder="Type new question" />
          <img width={30} style={{ left: "-40px" }} className="position-relative cursor-pointer" src={images.sendIcon} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
