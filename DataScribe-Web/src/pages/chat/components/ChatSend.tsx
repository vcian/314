import { FC } from "react";
import { images } from "../../../assets/images";

interface IChatSend {
  data: any;
}

const ChatSend: FC<IChatSend> = ({ data }) => {
  return (
    <div className="chat-send d-flex align-items-center">
      <div>
        <img className="profile-img" src={images.user} alt="user" />
      </div>
      <div>
        <p className="mb-0 ml-10 c-black">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dicta veniam nobis dignissimos consequatur, nesciunt perspiciatis nam laudantium placeat suscipit velit, odio praesentium
          provident. Dolores deleniti rem totam quos, placeat ex perspiciatis itaque facere voluptas nam nostrum consectetur possimus vel temporibus praesentium dignissimos, amet eaque eum earum sed
          voluptate! Ut quisquam quae sed, dolores optio, recusandae perferendis adipisci ratione commodi eius dolorem? Ducimus ad itaque corrupti assumenda dolorum esse ex eius nobis perferendis,
          eveniet unde, animi sapiente. Velit architecto aut corporis animi ut ullam ab adipisci quod libero maiores natus illo, earum culpa saepe harum mollitia quae beatae quia deleniti. Ipsam,
          nemo?
        </p>
      </div>
    </div>
  );
};

export default ChatSend;
