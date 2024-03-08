import { ACCESS_CHAT_FAIL, ACCESS_CHAT_REQUEST, ACCESS_CHAT_SUCCESS,  ALL_CHATS_OF_USER_FAIL, ALL_CHATS_OF_USER_REQUEST, ALL_CHATS_OF_USER_SUCCESS,   SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_RESET, SEARCH_USER_SUCCESS ,ALL_MESSAGES_FAIL, ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_RESET, SEND_MESSAGE_SUCCESS  } from "../ActionType"



//SEARCH A USER
export const searchUserReducer = (state={
    loading:false,
    users:[],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case SEARCH_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case SEARCH_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                users : payload,
            }
            case SEARCH_USER_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
              case SEARCH_USER_RESET:
                return{
                   loading:false,
                   users:[],
                   success : false
                }  
                default:
                    return {...state}
    }
}


//load chats of user
export const accessChatReducer = (state={
    loading:false,
    users:[],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case ACCESS_CHAT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ACCESS_CHAT_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true,
                users : payload.users,
            }
            case ACCESS_CHAT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}

//get all chats of user
export const allChatUserReducer = (state={
    loading:false,
     allchats : [],
    success:false,
},action) =>{
    const {type,payload} = action

    switch(type){
        case ALL_CHATS_OF_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ALL_CHATS_OF_USER_SUCCESS:
            return{
                loading:false,
                success:true,
               allChats : payload,
            }
            case ALL_CHATS_OF_USER_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}


export const sendMessagesReducer = (state={
    loading:false,
    isSent : false,
    message : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case SEND_MESSAGE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                isSent : true,
                message : payload.message
            }
            case SEND_MESSAGE_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                case SEND_MESSAGE_RESET:
                 return{
                    ...state,
                    isSent:false,
                    message:""
                 }
                default:
                    return {...state}
    }
}


//all messages with user:-
export const allMessagesReducer = (state={
    loading:false,
    isReceived : false,
    messages : {}
},action) =>{
    const {type,payload} = action

    switch(type){
        case ALL_MESSAGES_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ALL_MESSAGES_SUCCESS:
            return{
                ...state,
                loading:false,
                isReceived : true,
                messages : payload.messages,
                error:""
            }
            case ALL_MESSAGES_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:payload
                }
                default:
                    return {...state}
    }
}