import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Spinner } from "reactstrap";
import { embeddingApi, getWorkSpaceListApi } from "../../actions/action";
import { images } from "../../assets/images";
import "../../styles/chat.scss";
import ChatReply from "./components/ChatReply";
import ChatSend from "./components/ChatSend";

const Chat = () => {
	const params = useParams();
	const [search, setSearch] = useState("");
	const [workspace, setWorkSpace] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [chatData, setChatData] = useState<any[]>([]);

	const handleSend = () => {
		setLoading(true);
		embeddingApi(params?.slug, search)
			.then((res) => {
				setChatData([
					...chatData,
					{ type: "send", message: search },
					{
						type: "reply",
						message: res.data
					}
				]);
				setLoading(false);
				setSearch("");
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const onKey = (e: any) => {
		if (e.keyCode === 13) {
			handleSend();
		}
	};

	const getWorkspaceAction = () => {
		getWorkSpaceListApi().then((res) => {
			setWorkSpace(res.data.rows);
		});
	};

	useEffect(() => {
		getWorkspaceAction();
	}, []);

	return (
		<div className="chat-body">
			{!params?.slug ? (
				<div className="d-flex justify-content-center align-items-center h-100">
					<p>No any Workspace selected</p>
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
							<Input disabled={loading} onKeyDown={onKey} className="p-10" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type new question" />
							{loading ? (
								<Spinner size={"sm"} style={{ left: "-40px" }} className="position-relative" />
							) : (
								<img width={30} style={{ left: "-40px" }} onClick={handleSend} className="position-relative cursor-pointer" src={images.sendIcon} alt="icon" />
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
