import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../Layout/Navbar/Navbar";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import { getAllChat } from "../../../Redux/Actions/messageAction";
import { useDispatch, useSelector } from "react-redux";
import { SideBarChatLoader } from "./ChatLoader";
import { getSideBarUser } from "./getChatUtils";
import dateFormat from "dateformat";
import { UilLinkedin } from "@iconscout/react-unicons";
import { UilInstagramAlt } from "@iconscout/react-unicons";
import { Button, IconButton } from "@chakra-ui/react";
import { UilGithub } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState([]);
  const [reqUser, setReqUser] = useState({});

  const dispatch = useDispatch();

  const { loading: getAllChatsLoading, allChats } = useSelector(
    (state) => state.allChats
  );

  useEffect(() => {
    dispatch(getAllChat());
  }, []);

  console.log("req User date", reqUser);

  return (
    <div className="w-screen min-w-screen container  min-h-screen h-screen px-auto shadow-lg rounded-lg">
      <NavBar />
      {/* <!-- Chatting --> */}
      <div className="flex  flex-row justify-between bg-color17 ">
        <div className="flex flex-col w-2/5 border-r-2">
          <h1 className="text-center mt-[1.5rem] text-xl font-nunito font-bold mb-[1rem]">
            All Chats
          </h1>
          {getAllChatsLoading ? (
            <SideBarChatLoader />
          ) : allChats && allChats.length > 0 ? (
            <div
              className="flex flex-col w-full overflow-auto "
              style={{
                height: "calc(100vh - 170px)",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Internet Explorer/Edge
                "&::-webkit-scrollbar": { display: "none" }, // Webkit (Chrome, Safari, Opera)
              }}
            >
              {allChats &&
                allChats.map((chat) => (
                  <SideBar
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    chat={chat}
                    reqUser={reqUser}
                    setReqUser={setReqUser}
                  />
                ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* <!-- message --> */}
        <div className="w-full h-full px-5 flex flex-col justify-between">
          <ChatBox
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>
        {/* <!-- end message --> */}

        <div className="w-2/5 py-[5rem] border-l-2 px-5">
          <div className="flex flex-col">
            <div className="font-semibold text-xl py-4 text-center">
              {reqUser ? reqUser.name : ""}
            </div>
            <img
              src={reqUser.avatar ? reqUser.avatar.url : ""}
              className="object-cover rounded-xl h-64"
              alt=""
            />
            <div className="font-semibold py-4">
              Joined{" "}
              {reqUser ? dateFormat(reqUser.createdAt, "mmmm dS, yyyy") : ""}
            </div>
            <div className="font-light">
              {reqUser && reqUser.bio != "" ? reqUser.bio : "No description"}
            </div>
            <div className="flex mt-[1.5rem] flex-row ">
              <Link to={reqUser ? reqUser.linkedURL :""}>
              <IconButton
                marginRight="1rem"
                isRound={true}
                isDisabled={reqUser && reqUser.linkedURL ==="" ? true:false}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="20px"
                icon={<UilLinkedin />}
              />
              </Link>
             <Link to={reqUser ? reqUser.instagramURL :""}>
             <IconButton
                isRound={true}
                marginRight="1rem"
                isDisabled={reqUser && reqUser.instagramURL ==="" ? true:false}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="20px"
                icon={<UilInstagramAlt />}
              />
             </Link>
           
           <Link to={reqUser ? reqUser.githubURL :""}>
           <IconButton
           isRound={true}
           variant="solid"
           isDisabled={reqUser && reqUser.githubURL ==="" ? true:false}
           colorScheme="teal"
           aria-label="Done"
           fontSize="20px"
           icon={<UilGithub />}
         />
           </Link>
              
            </div>
            <Link to={`/userBio/${reqUser._id}`}>
            <Button marginTop='1rem' colorScheme="teal" variant="outline">
              View Full Profile
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
