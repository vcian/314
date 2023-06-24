import { useEffect, useState } from "react";
import { Button, Input, Label, Modal } from "reactstrap";
import { createWorkSpaceApi, getWorkSpaceListApi } from "../../actions/action";
import { images } from "../../assets/images";
import "../../styles/chat.scss";
import { toastSuccess } from "../../utils/CommonFuncation";
import ChatReply from "./components/ChatReply";
import ChatSend from "./components/ChatSend";

const Chat = () => {
  const [search, setSearch] = useState("");
  const [workspace, setWorkSpace] = useState<any[]>([]);
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [modal, setModal] = useState(false);
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
  const handleSend = () => {
    const demo = search;
    setChatData([...chatData, { type: "send", message: demo }, { type: "reply", message: "lorem10" }]);
    setTimeout(() => {
      setSearch("");
    }, 100);
  };

  const onKey = (e: any) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  const getWorkspaceAction = () => {
    getWorkSpaceListApi().then((res) => {
      setWorkSpace(res.data);
    });
  };

  useEffect(() => {
    getWorkspaceAction();
  }, []);

  const handleCreateWorkSpace = () => {
    createWorkSpaceApi(workSpaceName).then((res) => {
      console.log(res);
      setModal(false);
      toastSuccess(res.message);
      setWorkSpaceName("");
    });
  };

  return (
    <div className="chat-body">
      {workspace.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Button className="btn-primary" onClick={() => setModal(true)}>
            Create workspace
          </Button>
        </div>
      ) : (
        <>
          <div className=" chat-body-output-main d-flex justify-content-center">
            <div className="chat-body-output">
              {chatData?.map((res, index) => (
                <div className="w-100" key={index}>
                  {res?.type === "send" ? <ChatSend data={res.message} /> : <ChatReply data={res.message} />}
                </div>
              ))}
            </div>
          </div>
          <div className="chat-body-input p-10">
            <div className="w-100 d-flex align-items-center justify-content-center">
              <Input onKeyDown={onKey} className="p-10" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type new question" />
              <img width={30} style={{ left: "-40px" }} onClick={handleSend} className="position-relative cursor-pointer" src={images.sendIcon} alt="icon" />
            </div>
          </div>
        </>
      )}
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(false);
        }}>
        <div className="p-20">
          <h4 className="text-center">Create Workspace</h4>
          <div className="mt-20">
            <Label>Workspace name</Label>
            <Input placeholder="Workspace name" className="p-10" value={workSpaceName} onChange={(e) => setWorkSpaceName(e.target.value)} />
          </div>
          <div className="mt-20 text-center">
            <Button disabled={Boolean(!workSpaceName)} className="btn-primary" onClick={handleCreateWorkSpace}>
              Create workspace
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
