import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOGIN_AFTER_OTPVERIFICATION, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, OTP_VERIFICATION_FAIL, OTP_VERIFICATION_REQUEST, OTP_VERIFICATION_SUCCESS, REGISTERED_LOGIN, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../ActionType"

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
             case LOGIN_AFTER_OTPVERIFICATION:
                return{
                    ...state,
                    loading:false,
                    isAuthenticated:true,
                    user : payload,
                    error:null
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
                 isRegistered:false,
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


//OTP Verfication
export const otpVerificationReducer = (state={
    loading:false,
    isVerified: false,
    message:""
},action)=>{
const {type,payload} = action
 switch(type){
     case OTP_VERIFICATION_REQUEST:
         return {
            ...state,
            loading:true,
            isVerified:false,
         }

         case OTP_VERIFICATION_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isVerified:true,
                 message:payload,
                 error:null
             }
             case OTP_VERIFICATION_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isVerified:false,
                 message:"",
                 error:payload

             }
             default:
                 return state
 }

}


//Forget Password 
export const forgetPasswordReducer = (state={
    loading:false,
    isSent: false,
    message:""
},action)=>{
const {type,payload} = action
 switch(type){
     case FORGET_PASSWORD_REQUEST:
         return {
            ...state,
            loading:true,
            isSent:false,
         }

         case FORGET_PASSWORD_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isSent:true,
                 message:payload,
                 error:null
             }
             case FORGET_PASSWORD_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isSent:false,
                 message:"",
                 error:payload

             }
             default:
                 return state
 }

}


//RESET Password

export const resetPasswordReducer = (state={
    loading:false,
    isReset: false,
    user:{}
},action)=>{
const {type,payload} = action
 switch(type){
     case RESET_PASSWORD_REQUEST:
         return {
            ...state,
            loading:true,
            isReset:false,
         }

         case RESET_PASSWORD_SUCCESS:
             return{
                ...state,
                 loading:false,
                 isReset:true,
                 user:payload,
                 error:null
             }
             case RESET_PASSWORD_FAIL: 
             return{
                 ...state,
                 loading:false,
                 isReset:false,
                 user:{},
                 error:payload

             }
             default:
                 return state
 }

}
