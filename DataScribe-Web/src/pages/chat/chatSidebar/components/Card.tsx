import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { images } from "../../../../assets/images";

const Card = ({ res, setModal }: any) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const handleClick = () => navigate("/chat/" + res?.slug);

	return (
		<div onClick={handleClick} className={`sidebar-link ${location.pathname.includes("/" + res?.slug) ? "sidebar-link-active" : ""} mt-10`}>
			<img src={images.chatIcon} width={25} alt="icon" />
			<div className="d-flex justify-content-between align-items-center w-100">
				<p className="mb-0 ml-20">{res.name}</p>
				<Dropdown isOpen={dropdownOpen} toggle={toggle} className="drop-down">
					<DropdownToggle caret>
						<FontAwesomeIcon className={`${location.pathname === res ? "c-primary" : "c-black"}`} icon={faEllipsisVertical} />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem
							onClick={() => {
								setModal({
									isOpen: true,
									data: res
								});
							}}>
							Upload
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
};

export default Card;
