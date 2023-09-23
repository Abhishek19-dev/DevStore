import axios from "axios"
import { GET_USER_DETAILS_RESET, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTERED_LOGIN, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../ActionType"

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
        