/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { Button } from "reactstrap";
import { images } from "../../../assets/images";
import { toastSuccess } from "../../../utils/CommonFuncation";

interface IChatReply {
  data: string;
}

const ChatReply: FC<IChatReply> = ({ data }) => {
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
    <div className="chat-send mt-20 d-flex">
      <div className="chat-send-img">
        <img width={40} className="" src={images.logo} alt="user" />
      </div>
      <div className="chat-send-que">
        {data.split("```").map((res, index) => {
          if (index % 2 === 0) {
            return (
              <pre
                key={index}
                style={{ whiteSpace: "pre-wrap" }}
                className="font-16"
                dangerouslySetInnerHTML={{
                  __html: index === 0 ? handleHtml(res) : handleHtml(res)
                }}></pre>
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
      </div>
    </div>
  );
};

export default ChatReply;
