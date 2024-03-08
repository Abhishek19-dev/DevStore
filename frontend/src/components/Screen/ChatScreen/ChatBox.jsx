import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMessagesAction, sendMessageAction } from "../../../Redux/Actions/messageAction";
import MessageBox from "./messageBox";
import io from "socket.io-client";
import { MessageSpinner } from "./ChatLoader";

//socket.io
const ENDPOINT = "http://localhost:9050";
var socket, selectedChatCompare;

const ChatBox = ({ selectedChat, setSelectedChat }) => {
  const dispatch = useDispatch();
  const {
    isReceived,
    loading: messageLoading,
    messages: receivedMessages,
  } = useSelector((state) => state.allMessages);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const { user } = useSelector((state) => state.userDetails);
  useEffect(() => {
    if (selectedChat && socket) {
      dispatch(allMessagesAction(selectedChat));
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat;
    } else {
      return;
    }
  }, [selectedChat]);

  useEffect(() => {
    if (receivedMessages.length > 0) {
      // Update the messages state with receivedMessages when it changes.
      setMessages(receivedMessages);
    }
  }, [receivedMessages]);

  const sendMessage = async (event) => {
    if (socket) {
      socket.emit("stop typing", selectedChat._id);
      dispatch(
        sendMessageAction(newMessage, selectedChat, socket, setNewMessage)
      );
      setNewMessage("");
    } else {
      console.error("Socket is not initialized yet."); // Add an error message or handle it as needed
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      
      sendMessage();
    }
  };

  //socket.io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("setup", user);
  }, []);

  // recieivng a  message using socket io
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("old messages",messages)
      console.log("newMessageReceived abhishek",newMessageReceived.message)
      console.log("selected chat compate",selectedChatCompare._id)
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.message.chat._id
      ) {
        //Give notification
      } else {
        setMessages([...messages, newMessageReceived.message]);
        // console.log("new message final message",messages)
      }
    });
  });


  const typingHandler = (e)=>{
    setNewMessage(e.target.value)
     if(!socketConnected) return;
 }

  const { isSent, message: sentMessage } = useSelector(
    (state) => state.sendMessage
  );
  useEffect(() => {
    if (isSent) {
      setMessages([...messages, sentMessage]);
    }
  }, [isSent]);

  console.log("messages os user :", receivedMessages);
  return (
    <>
      <div
        className="flex  flex-col mt-5"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div
          class="p-3 flex  overflow-y-auto flex-col mt-5 b"
          style={{
            height: "calc(100vh - 100px)",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer/Edge
            "&::-webkit-scrollbar": { display: "none" }, // Webkit (Chrome, Safari, Opera)
          }}
        >
          {messages.length > 0
            ? messages.map((message) => (
                <MessageBox message={message} />
              ))
            : <div className="font-nunito font-bold text-xl text-center"> No Chats TO Show ! </div>}
        </div>
        <div class="py-5">
          <input
            class="w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            value={newMessage}
            onChange={typingHandler}
            onKeyDown={handleKeyDown}
            placeholder="type your message here..."
          />
        </div>
      </div>
    
    </>
  );
};

export default ChatBox;
