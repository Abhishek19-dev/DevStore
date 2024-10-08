import React from "react";
import { getSideBarUser } from "./getChatUtils";
import { useSelector } from "react-redux";

const SideBar = ({ selectedChat, setSelectedChat, chat ,reqUser,setReqUser}) => {
  const { user } = useSelector((state) => state.userDetails);
  console.log("User inside",user)
  const requiredUser = getSideBarUser(user, chat);
  console.log("Rquired User",requiredUser)
  setReqUser(requiredUser)
  console.log("req user",reqUser)

  // useEffect(() => {
  //   const requiredUser = getSideBarUser(user, chat);
  //   setReqUser(requiredUser);
  // }, [user, chat]);
  return (
    <>
      <div onClick={setSelectedChat(chat)} class={selectedChat && selectedChat._id === chat._id ? "flex bg-white flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400" : "flex flex-row py-4 px-2 justify-center items-center border-b-2" }>
        <div class="w-1/4">
          <img
            src={reqUser ?. avatar ?. url}
            class="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </div>
        <div class="w-full">
          <div class="text-lg font-semibold">{reqUser && reqUser.name}</div>
          <span class="text-gray-500">{chat.latestMessage ? chat.latestMessage.content : "No Message To Show"}</span>
        </div>
      </div>
    </>
  );
};

export default SideBar;