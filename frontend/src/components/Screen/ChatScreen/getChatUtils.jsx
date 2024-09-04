export const getSideBarUser = (user, chat) => {
    console.log("inside chat utils function")
    return chat.users[0]._id === user._id ? chat.users[1] : chat.users[0];
};

export const isMessageSendByUser = (message , user)=>{
    return message.sender._id === user._id
}