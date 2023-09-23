import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTERED_LOGIN, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../ActionType"

export const loginReducer = (state={
    loading:false,
    isAuthenticated: false,
    user:{}
},action)=>{
const {type,payload} = action
 switch(type){
     case LOGIN_REQUEST:
         return {
            ...state,
            loading:true,
            isAuthenticated:false,
         }

         case LOGIN_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isAuthenticated:true,
                 user : payload,
                 error:null
             }
             case LOGIN_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isAuthenticated:false,
                 error:payload

             }
             case LOGIN_RESET:
                 return{
                     ...state,
                     loading:false,
                     isAuthenticated:false,
                     user:null
                 }
             default:
                 return state
 }

}



export const logoutReducer = (state={
    loading:false,
    isLoggedOut: false,
    message:{},
},action)=>{
const {type,payload} = action
 switch(type){
     case LOGOUT_REQUEST:
         return {
            ...state,
            loading:true,
            isLoggedOut:false,
         }

         case LOGOUT_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isLoggedOut:true,
                 message : payload,
             }

             case LOGOUT_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isLoggedOut:false,
                 error:payload

             }
             default:
                 return state
 }

}


export const registerReducer = (state={
    loading:false,
    isRegistered:false,
    user:{},
},action)=>{
const {type,payload} = action
 switch(type){
     case REGISTER_REQUEST:
         return {
            ...state,
            isRegistered:false,
            loading:true,
         }

         case REGISTER_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isRegistered:true,
                 user : payload
             }
             case REGISTER_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isRegistered:true,
                 error:payload
             }
             case REGISTERED_LOGIN:
                 return{
                     ...state,
                     isRegistered:true,
                     user : payload
                 }
             default:
                 return state
 }

}



