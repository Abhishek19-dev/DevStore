import axios from "axios";
import { EDIT_DETAILS_FAIL, EDIT_DETAILS_REQUEST, EDIT_DETAILS_SUCCESS, EDIT_PROFILE_RESET, GET_EDITED_USER_DETAILS_REQUEST, GET_USER_DETAILS_FAIL, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS } from "../ActionType";

export const editProfileAction= (name,email,phoneNo,whatsAppNo,address,bio,gender) => async(dispatch)=>{
    try {
        dispatch({
            type:EDIT_DETAILS_REQUEST,
        })
   
        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/v1/profile/update`,{name,email,phoneNo,whatsAppNo,address,bio,gender},config)

        dispatch({
            type:EDIT_DETAILS_SUCCESS,
            payload:data
        })
        dispatch({
            type : GET_EDITED_USER_DETAILS_REQUEST,
            payload:data
        })
        
    } catch (error) {
    console.log(error)
        dispatch({
            type:EDIT_DETAILS_FAIL,
            payload:error.response.data.message
        })
        
    }
    }

//GET ONE USER DETAILS:-
    export const getUserDetailsAction= () => async(dispatch)=>{
        try {
            dispatch({
                type:GET_USER_DETAILS_REQUEST,
            })
       
           
            const {data} = await axios.get(`/api/v1/me`)
    
            dispatch({
                type:GET_USER_DETAILS_SUCCESS,
                payload:data
            })
            console.log(data)
            
        } catch (error) {
        console.log(error)
            dispatch({
                type:GET_USER_DETAILS_FAIL,
                payload:error.response.data.message
            })
            
        }
        }


        //UPDATE PASSWORD:-
        export const updatePasswordAction= (oldPassword,newPassword,confirmNewPassword) => async(dispatch)=>{
            try {
                dispatch({
                    type:UPDATE_PASSWORD_REQUEST,
                })
           
                const config = {headers :{"Content-type":"application/json"}};
                const {data} = await axios.put(`/api/v1/password/update`,{oldPassword,newPassword,confirmNewPassword},config)
        
                dispatch({
                    type:UPDATE_PASSWORD_SUCCESS,
                    payload:data
                })
               
                
            } catch (error) {
            console.log(error)
                dispatch({
                    type:UPDATE_PASSWORD_FAIL,
                    payload:error.response.data.message
                })
                
            }
            }

            //RESET UPDATED PASSWORD AFTER 1 MIN:-
            export const updatePasswordReset = () => async(dispatch)=>{
                    dispatch({
                        type: UPDATE_PASSWORD_RESET
                    })
            }

             //RESET EDITED PROFILE AFTER 1 MIN:-
             export const editProfileReset = () => async(dispatch)=>{
                dispatch({
                    type: EDIT_PROFILE_RESET
                })
        }