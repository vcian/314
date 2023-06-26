import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { logoutApi } from "../../../actions/action";
import { images } from "../../../assets/images";
import { IRootReducer } from "../../../store";
import { onLogOut } from "../../../store/AuthReducer";
import { setLoading } from "../../../store/LoadingReducer";

const ChatHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state: IRootReducer) => state.userData);
	const handleLogout = () => {
		dispatch(setLoading(true));
		logoutApi().then(() => {
			dispatch(onLogOut());
			navigate("/login");
			dispatch(setLoading(false));
		});
	};
	return (
		<>
			<div className="chat-header">
				<div className="d-flex align-items-center">
					<p className="mb-0 mr-10 c-black fw-bold">{user?.firstName}</p>
					<img src={images.user} alt="user" />
				</div>
				<Button className="btn-primary ml-20" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</>
	);
};

export default ChatHeader;
