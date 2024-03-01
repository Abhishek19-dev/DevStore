import axios from "axios"
import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, GET_USER_DETAILS_RESET, LOGIN_AFTER_OTPVERIFICATION, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, OTP_VERIFICATION_FAIL, OTP_VERIFICATION_REQUEST, OTP_VERIFICATION_SUCCESS, REGISTERED_LOGIN, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../ActionType"
import { useDispatch } from "react-redux";

export const loginAction = (email,password) => async(dispatch)=>{
try {
    dispatch({
        type:LOGIN_REQUEST,
    })
    const config = {headers :{"Content-type":"application/json"}};
    const {data} = await axios.post('/api/v1/login',{email,password},config)


    dispatch({
        type:LOGIN_SUCCESS,
        payload:data.user
    })
    dispatch({
        type:REGISTERED_LOGIN,
        payload:data.user
    })
    
} catch (error) {
console.log(error)
    dispatch({
        type:LOGIN_FAIL,
        payload:error.response.data.message
    })
    
}
}


export const logoutAction = () => async(dispatch)=>{
    try {
        dispatch({
            type:LOGOUT_REQUEST,
        })

        const {data} = await axios.get('/api/v1/logOut')
        console.log(data)
    
        dispatch({
            type:LOGOUT_SUCCESS,
            payload:data.message
        })
        dispatch({
            type:LOGIN_RESET,
        })
        dispatch({
            type:GET_USER_DETAILS_RESET
        })
        
    } catch (error) {
    console.log(error)
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
        
    }
    }


    // export const registerAction = (name,email,password,avatar) => async(dispatch)=>{
    export const registerAction = (formData) => async(dispatch)=>{
        // console.log(name,email,password,avatar)
        console.log("form data",formData)
        try {
            dispatch({
                type:REGISTER_REQUEST,
            })
            // console.log("avatar",avatar)
            // const config = {headers :{"Content-type":"multipart/form-data"}};
            // const config = {headers :{"Content-type":"application/json"}};
            const config = {headers :{"Content-type":"multipart/form-data"}};
            // const {data} = await axios.post('/api/v1/register',{name,email,password,file:avatar},config)
            const {data} = await axios.post('/api/v1/register',formData,config)
           
            dispatch({
                type:REGISTER_SUCCESS,
                payload:data.user
            })
            
        } catch (error) {
        console.log(error)
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.message
            })
            
        }
        }



//OTP Verification
export const otpVerificationAction = (email,otp) => async(dispatch)=>{
    console.log(email)
    try {
        dispatch({
            type:OTP_VERIFICATION_REQUEST,
        })
        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.post('/api/v1/otpVerification',{email,otp},config)

        dispatch({
            type:OTP_VERIFICATION_SUCCESS,
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:OTP_VERIFICATION_FAIL,
            payload:error.response.data.message
        })
        
    }
    }        
        

//Forget Password
export const forgetPasswordAction = (email) => async(dispatch)=>{

    try {
        dispatch({
            type:FORGET_PASSWORD_REQUEST,
        })
        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.post('/api/v1/password/forgot',{email},config)

        dispatch({
            type:FORGET_PASSWORD_SUCCESS,
            payload:data.message
        })
      

    } catch (error) {
        dispatch({
            type:FORGET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
        
    }
    }     

  //RESET PASSWORD
  export const resetPasswordAction = (password , confirmPassword ,token) => async(dispatch)=>{

    try {
        dispatch({
            type:RESET_PASSWORD_REQUEST,
        })
        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/v1/password/reset/${token}`,{password , confirmPassword},config)

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.user
        })
      

    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
        
    }
    }   