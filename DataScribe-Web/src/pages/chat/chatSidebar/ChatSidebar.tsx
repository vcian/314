/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Label, Modal, Spinner } from "reactstrap";
import { createWorkSpaceApi, getWorkSpaceListApi, logoutApi, uploadFileApi } from "../../../actions/action";
import { images } from "../../../assets/images";
import { onLogOut } from "../../../store/AuthReducer";
import { setLoading } from "../../../store/LoadingReducer";
import { toastSuccess } from "../../../utils/CommonFuncation";
import Card from "./components/Card";

const ChatSidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const [loading, setIsLoading] = useState(false);

	const handleRedirect = (url: string) => {
		navigate(url);
	};

	const handleLogout = () => {
		dispatch(setLoading(true));
		logoutApi().then(() => {
			dispatch(onLogOut());
			navigate("/login");
			dispatch(setLoading(false));
		});
	};
	const array = [
		{
			font: images.chatIcon,
			label: "My Workspace",
			onClick: () => handleRedirect("/chat"),
			path: "/chat"
		}
	];
	const [type, setType] = useState(true);
	const [data, seData] = useState<any[]>([]);
	const [modal, setModal] = useState<any>({
		isOpen: false,
		data: {}
	});
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [workSpace, setWorkSpace] = useState<any[]>([]);

	const getWorkspaceAction = () => {
		getWorkSpaceListApi().then((res) => {
			setWorkSpace(res.data.rows);
		});
	};

	useEffect(() => {
		getWorkspaceAction();
	}, []);

	const formik = useFormik({
		initialValues: {
			url: "",
			file: []
		},
		onSubmit: (values) => {
			setIsLoading(true);
			const formData = new FormData();
			//@ts-ignore
			formData.append("file", values?.file);
			uploadFileApi({ slug: modal?.data?.slug, data: formData })
				.then((res) => {
					setModal({ ...modal, isOpen: false });
					toastSuccess(res.message);
					setIsLoading(false);
				})
				.catch((err) => {
					setIsLoading(false);
				});
		}
	});
	const { errors, values, touched, handleBlur, setFieldValue, handleChange, handleReset, handleSubmit } = formik;

	const toggle = () => {
		// @ts-ignore
		handleReset();
		setType(true);
		getWorkspaceAction();
		setDropdownOpen((prevState) => !prevState);
	};

	const [workSpaceModal, setWorkSpaceModal] = useState({
		isOpen: false,
		text: ""
	});
	const handleCreateWorkSpace = () => {
		setIsLoading(true);
		createWorkSpaceApi(workSpaceModal.text)
			.then((res) => {
				setModal(false);
				toastSuccess(res.message);
				setWorkSpaceModal({ isOpen: false, text: "" });
				getWorkspaceAction();
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	return (
		<div className="chat-sidebar p-20">
			<div className="d-flex align-items-center mb-20">
				<img src={images.logo} width={40} />
				<h4 className="ml-10 mb-0 c-black">
					<span className="fw-bold">Data</span>Scribe
				</h4>
			</div>
			<div className="">
				<div>
					{array.map((res, index) => (
						<div key={index} onClick={() => setWorkSpaceModal({ isOpen: true, text: "" })} className={`sidebar-link ${location.pathname === res.path ? "sidebar-link-active" : ""} mt-10`}>
							<FontAwesomeIcon icon={faPlus} />
							<div className="d-flex justify-content-between align-items-center w-100">
								<p className="mb-0 ml-20">Add New Workspace</p>
							</div>
						</div>
					))}
					{workSpace?.length !== 0 && workSpace?.map((res, index) => <Card res={res} key={index} setModal={setModal} />)}
				</div>
			</div>
			<Modal
				toggle={() => {
					// @ts-ignore
					handleReset();
					if (!loading) setModal({ ...modal, isOpen: false });
				}}
				isOpen={modal.isOpen}
				centered>
				<div className="p-30">
					<h4 className="text-center">Data Sources</h4>
					<div className="d-flex">
						<p
							className={`w-100 p-20 text-center ${type ? "active-modal" : ""} mb-0 cursor-pointer`}
							onClick={() => {
								// @ts-ignore
								handleReset();
								setType(true);
							}}>
							Files
						</p>
						<p
							className={`w-100 p-20 text-center ${!type ? "active-modal" : ""} mb-0 cursor-pointer`}
							onClick={() => {
								toastSuccess("Coming soon");
							}}>
							Website
						</p>
					</div>
					{type ? (
						<div className="mt-20">
							<Label>Upload Files</Label>
							<Input
								type="file"
								accept="application/pdf"
								onChange={(e: any) => {
									if (e?.target?.files[0]) {
										setFieldValue("file", e?.target?.files[0]);
									}
								}}
								className="p-10"
							/>
						</div>
					) : (
						<div className="mt-20">
							<Label>Website</Label>
							<Input className="p-10" invalid={Boolean(touched?.url && errors?.url)} name="url" onChange={handleChange} onBlur={handleBlur} value={values.url} placeholder="https:www.example.com" />
							{touched?.url && errors?.url && <p className="text-danger mb-0">{errors?.url}</p>}
						</div>
					)}
					<Button disabled={values?.file?.length === 0} className="btn-primary mt-20 w-100" onClick={() => handleSubmit()}>
						Upload Data {loading && <Spinner size={"sm"} />}
					</Button>
				</div>
			</Modal>

			<Modal
				centered
				isOpen={workSpaceModal.isOpen}
				toggle={() => {
					if (!loading) setWorkSpaceModal({ isOpen: false, text: "" });
				}}>
				<div className="p-20">
					<h4 className="text-center">Create Workspace</h4>
					<div className="mt-20">
						<Label>Workspace name</Label>
						<Input placeholder="Workspace name" className="p-10" value={workSpaceModal.text} onChange={(e) => setWorkSpaceModal({ ...workSpaceModal, text: e.target.value })} />
					</div>
					<div className="mt-20 text-center">
						<Button disabled={Boolean(loading || !workSpaceModal.text)} className="btn-primary" onClick={handleCreateWorkSpace}>
							Create workspace {loading && <Spinner size={"sm"} />}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ChatSidebar;
