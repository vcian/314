/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faChevronDown, faCopy, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { Button } from "reactstrap";
import { images } from "../../../assets/images";
import { toastSuccess } from "../../../utils/CommonFuncation";

interface IChatReply {
	data: any;
}

const ChatReply: FC<IChatReply> = ({ data }) => {
	const [open, setOpen] = useState(false);
	const handleHtml = (str: string) => {
		let d = "";
		let no = 2;
		String(str)
			.split("")
			.map((res) => {
				if (res === "`") {
					if (no % 2 === 0) {
						d = d + "<b>` ";
						no = no + 1;
					} else {
						d = d + " `</b>";
						no = no + 1;
					}
				} else {
					d = d + res;
				}
			});
		return d;
	};
	const handleCopy = (className: string) => {
		const btn = document.getElementsByClassName(className)[0].getElementsByClassName("sc-dcrmVg")[0];
		// @ts-ignore
		btn.click();
		toastSuccess("Copied");
	};
	return (
		<div className="chat-send bg-custom mt-20 d-flex">
			<div className="chat-send-img">
				<img width={40} className="" src={images.logo} alt="user" />
			</div>
			<div className="chat-send-que">
				{data?.textResponse?.split("```").map((res: any, index: number) => {
					if (index % 2 === 0) {
						return (
							<p
								key={index}
								style={{ whiteSpace: "pre-wrap" }}
								className="font-14 text-black"
								dangerouslySetInnerHTML={{
									__html: index === 0 ? handleHtml(res) : handleHtml(res)
								}}></p>
						);
					} else {
						return (
							<div key={index} className={`my-1 chat-list-${index}`}>
								<div className="d-flex justify-content-end mb-10">
									<Button className="chat-btn" onClick={() => handleCopy(`chat-list-${index}`)}>
										<FontAwesomeIcon className="mr-10" icon={faCopy} />
										Copy
									</Button>
								</div>
								<CopyBlock language="jsx" text={res} codeBlock theme={dracula} showLineNumbers={true} wrapLines />
							</div>
						);
					}
				})}
				{data?.sources.length === 0 ? null : (
					<>
						<div className="mt-20">
							<p className="mb-0 fw-bold font-12" onClick={() => setOpen(!open)}>
								SOURCES
								<FontAwesomeIcon className="font-12 ml-10 text-black" icon={faChevronDown} />
							</p>
							<div className="d-flex gap-4">
								{open ? (
									<>
										{data?.sources?.map((resData: any, index: any) => (
											<div key={index} className="d-flex bg-custom-white align-items-center cursor-pointer mt-10" onClick={() => toastSuccess("Coming soon")}>
												<p className="mb-0 font-12 mr-10">{resData.title}</p>
												<FontAwesomeIcon className="font-12 c-primary" icon={faUpRightFromSquare} />
											</div>
										))}
									</>
								) : null}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ChatReply;
