import { EDIT_DETAILS_FAIL, EDIT_DETAILS_REQUEST, EDIT_DETAILS_SUCCESS, GET_EDITED_USER_DETAILS_REQUEST, GET_USER_DETAILS_FAIL, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS , UPDATE_PASSWORD_RESET, EDIT_PROFILE_RESET, GET_USER_DETAILS_RESET } from "../ActionType"

export const editProfileReducer = (state={
    loading:false,
    isEdited:false,
    user:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case EDIT_DETAILS_REQUEST:
            return{
            ...state,
            loading:true,
            isEdited:false
        }
        case EDIT_DETAILS_SUCCESS:
            return{
                ...state,
            loading:false,
            isEdited:true,
            user:payload.user
        }
        case EDIT_DETAILS_FAIL:
        return{
            ...state,
            loading :false,
            error:payload,
            isEdited:false,
            user:""
        }
        case EDIT_PROFILE_RESET:
            return {
                ...state,
                loading :false,
                error:"",
                isEdited:false,
                user:""
            }
        default:
               return state
    }
}

//Get one user Details:-
export const getUserDetailsReducer = (state={
    loading:false,
    user:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case GET_USER_DETAILS_REQUEST:
            return{
            ...state,
            loading:true,
        }
        case GET_USER_DETAILS_SUCCESS:
            return{
                ...state,
            loading:false,
            user:payload.user
        }
        case GET_USER_DETAILS_FAIL:
        return{
            ...state,
            loading :false,
            error:payload,
        }
        case GET_EDITED_USER_DETAILS_REQUEST:
            return{
                ...state,
            loading:false,
            user:payload.user
            }
            case GET_USER_DETAILS_RESET:{
                return{
                    ...state,
                    user:[]
                }
            }
        default:
               return state
    }
}


//update user password:-
export const updatePasswordReducer = (state={
    loading:false,
   message:" ",
   isUpdated:false
},action) =>{
    const {type , payload} = action
    switch(type){
        case UPDATE_PASSWORD_REQUEST:
            return{
            ...state,
            loading:true,
        }
        case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
            loading:false,
            message:payload.message,
            isUpdated:true,
            error:" "
        }
        case UPDATE_PASSWORD_FAIL:
        return{
            ...state,
            loading :false,
            error:payload,
            isUpdated:false
        }
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
            loading:true,
            message : '',
            isUpdated:false,
            error:''

            }
        default:
               return state
    }
}