/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal } from "reactstrap";
import * as Yup from "yup";
import { logoutApi } from "../../../actions/action";
import { images } from "../../../assets/images";
import { onLogOut } from "../../../store/AuthReducer";
import { setLoading } from "../../../store/LoadingReducer";

const ChatSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    },
    {
      font: images.logoutIcon,
      label: "Logout",
      onClick: () => handleLogout(),
      path: "/"
    }
  ];
  const [type, setType] = useState(true);
  const [data, seData] = useState<any[]>([]);
  const [modal, setModal] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: "",
      file: []
    },
    validationSchema: Yup.object().shape({
      url: Yup.string().url().required()
    }),
    onSubmit: (values) => {
      dispatch(setLoading(true));
    }
  });
  const { errors, values, touched, handleBlur, setFieldValue, handleChange, handleReset, handleSubmit } = formik;
  const toggle = () => {
    // @ts-ignore
    handleReset();
    setType(true);
    setDropdownOpen((prevState) => !prevState);
  };

  console.log(values);

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
          <div key={index} onClick={res.onClick} className={`sidebar-link ${location.pathname === res.path ? "sidebar-link-active" : ""} mt-10`}>
            <img src={res.font} width={25} alt="icon" />
            <div className="d-flex justify-content-between align-items-center w-100">
              <p className="mb-0 ml-20">{res.label}</p>
              {res.label === "My Workspace" ? (
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="drop-down">
                  <DropdownToggle caret>
                    <FontAwesomeIcon className={`${location.pathname === res.path ? "c-primary" : "c-black"}`} icon={faEllipsisVertical} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setModal(true)}>Upload</DropdownItem>
                    <DropdownItem>Clear Chat</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <Modal toggle={() => setModal(false)} isOpen={modal} centered>
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
                // @ts-ignore
                handleReset();
                setType(false);
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
          <Button className="btn-primary mt-20 w-100" onClick={() => handleSubmit()}>
            Next
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatSidebar;
