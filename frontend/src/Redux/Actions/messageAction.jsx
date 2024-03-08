import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS,  ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS,  SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS ,ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "../ActionType"
import axios from 'axios'


//SEARCH A USER:-
export const searchUser = (search) =>async(dispatch)=>{
    try {
     dispatch({
         type: SEARCH_USER_REQUEST
      })
      const {data} = await axios.get(`api/v1/singleUser?search=${search}`)
      console.log(data)
      dispatch({
          type : SEARCH_USER_SUCCESS,
          payload : data.users
      })
    } catch (error) {
        dispatch({
         type : SEARCH_USER_FAIL,
         payload:error.response.message.data
        })
    }
 }

 //Create a chat Or Load a chAT:-
 export const accessChat = (userId) =>async(dispatch)=>{
    try {
     dispatch({
         type: ACCESS_CHAT_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/chat",{userId},config)
      console.log("data",data.fullChat)
      dispatch({
          type : ACCESS_CHAT_SUCCESS,
          payload : data.fullChat
      })
      dispatch(getAllChat())
    } catch (error) {
        dispatch({
         type : ACCESS_CHAT_FAIL,
         payload:error.response.message.data
        })
    }
 }

 //get all chat of a user
 export const getAllChat = (selectedChat,setSelectedChat) =>async(dispatch)=>{
   
    try {
     dispatch({
         type: ALL_CHATS_OF_USER_REQUEST
      })
      
      const {data} = await axios.get("/api/v1/allChats")

      dispatch({
          type : ALL_CHATS_OF_USER_SUCCESS,
          payload : data.allChats
      })
    //   await setSelectedChat(data.allChats[0])
    } catch (error) {
        dispatch({
         type : ALL_CHATS_OF_USER_FAIL,
        //  payload:error.response.message.data
         payload:error.response      
        })
    }
 }



 export const sendMessageAction = (newMessage , selectedChat,socket,setNewMessage) =>async(dispatch)=>{
    try {
     dispatch({
         type: SEND_MESSAGE_REQUEST
      })
      const config = {headers:{"Content-type":"application/json"}}
      const {data} = await axios.post("/api/v1/message/send",{content:newMessage , chatId : selectedChat._id},config)
      dispatch({
          type : SEND_MESSAGE_SUCCESS,
          payload : data
      })
      socket.emit("new message",data)
      dispatch(allMessagesAction(selectedChat))
      
    } catch (error) {
        dispatch({
         type : SEND_MESSAGE_FAIL,
         payload:error.response
        })
    }
 }


 //get all messages:-
 export const allMessagesAction = (selectedchat) =>async(dispatch)=>{
    // console.log("selectedChatId",selectedchat._id)
    try {
     dispatch({
         type: ALL_MESSAGES_REQUEST
      })
      const {data} = await axios.get(`/api/v1/message/${selectedchat._id}`)
    //   console.log("messages data hehe",data)
      dispatch({
          type : ALL_MESSAGES_SUCCESS,
          payload : data
      })
    } catch (error) {
        dispatch({
         type : ALL_MESSAGES_FAIL,
         payload:error.response
        })
    }
 }
 


 

 



 






 