 import React from 'react'; 
import { useSelector } from 'react-redux';
import { isMessageSendByUser } from './getChatUtils';

 
 const MessageBox = ({message}) =>{
    const { user } = useSelector((state) => state.userDetails);
    const isMessageSendByUserValue =  user ? isMessageSendByUser(message , user) :"";
    
return (
    <>
     {
        isMessageSendByUserValue ?  <div class="flex justify-end mb-4">
        <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
          {message && message.content}
        </div>
        <img
          src= {message && message.sender.avatar.url}
          class="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      </div>
       :  <div class="flex justify-start mb-4">
            <img
              src= {message && message.sender.avatar.url}
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
             {message && message.content}
            </div>
          </div>
     }
    </>
)
};
 
export default MessageBox