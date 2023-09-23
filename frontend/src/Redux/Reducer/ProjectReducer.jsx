import { ADD_REVIEW_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ALL_PROJECT_FAIL, ALL_PROJECT_REQUEST, ALL_PROJECT_SUCCESS, BUY_PROJECT_FAIL, BUY_PROJECT_REQUEST, BUY_PROJECT_RESET, BUY_PROJECT_SUCCESS, DELETE_PROJECT_USER_FAIL, DELETE_PROJECT_USER_REQUEST, DELETE_PROJECT_USER_SUCCESS, EDITED_PROJECT_REQUEST, EDIT_DETAILS_SUCCESS, EDIT_PROJECT_FAIL, EDIT_PROJECT_REQUEST, EDIT_PROJECT_RESET, EDIT_PROJECT_SUCCESS, GET_ALL_REVIEWS_FAIL, GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS, GET_USER_ALL_PROJECT_AFTER_DELETION, GET_USER_ALL_PROJECT_REQUEST, GET_USER_ALL_PROJECT_SUCCESS, PROJECT_DETAILS_FAIL, PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, SELL_PROJECT_FAIL, SELL_PROJECT_REQUEST, SELL_PROJECT_SUCCESS } from "../ActionType"

//Get All Projects
export const projectReducer = (state={
    loading:false,
    projects:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case ALL_PROJECT_REQUEST:
            return{
            ...state,
            loading:true
        }
        case ALL_PROJECT_SUCCESS:
            return{
                ...state,
            loading:false,
            projects: payload.projects,
            noOfProjects : payload.noOfProjects
        }
        case ALL_PROJECT_FAIL:
        return{
            ...state,
            loading :false
        }
        default:
               return state
    }
}


//Get Project Details
export const projectDetailsReducer = (state={
    loading:false,
    project:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case PROJECT_DETAILS_REQUEST:
            return{
            ...state,
            loading:true
        }
        case PROJECT_DETAILS_SUCCESS:
            return{
                ...state,
            loading:false,
            project: payload.project,
        }
        case PROJECT_DETAILS_FAIL:
        return{
            ...state,
            loading :false
        }


        default:
               return state
    }
}




// GET ALL REVIEWS:-
export const getAllReviewsReducer = (state={
    loading:false,
    success:false,
    reviews:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case GET_ALL_REVIEWS_REQUEST:
            return{
            ...state,
            loading:true
        }
        case GET_ALL_REVIEWS_SUCCESS:
            return{
                ...state,
            loading:false,
            success:payload.success,
            reviews: payload.reviews
        }
        case GET_ALL_REVIEWS_FAIL:
        return{
            ...state,
            loading :false,
            error:payload
        }
        default:
               return state
    }
}



//Add a Review
export const addReviewReducer = (state={
    loading:false,
    success:false,
    review:[]
},action) =>{
    const {type , payload} = action
    switch(type){
        case ADD_REVIEW_REQUEST:
            return{
            ...state,
            loading:true
        }
        case ADD_REVIEW_SUCCESS:
            return{
                ...state,
            loading:false,
            success:payload.success,
            review:payload.review
        }
        case ADD_REVIEW_FAIL:
        return{
            ...state,
            loading :false,
            error:payload
        }
        

        default:
               return state
    }
}


//Get my Projects :-
export const getMyProjectsReducer = (state={
    loading:false,
    success:false,
    projects:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case GET_USER_ALL_PROJECT_REQUEST:
            return{
            ...state,
            loading:true
        }
        case GET_USER_ALL_PROJECT_SUCCESS:
            return{
                ...state,
            loading:false,
            success:payload.success,
            error:"",
            projects: payload.projects
        }
        case GET_ALL_REVIEWS_FAIL:
        return{
            ...state,
            loading :false,
            error:payload
        }
        // case GET_USER_ALL_PROJECT_AFTER_DELETION:{
        //     return{
        //         ...state,

        //     }
        // }
        default:
               return state
    }
}


// Delete project by user
export const deleteProjectUserReducer = (state={
    loading:false,
    isDeleted:false
},action) =>{
    const {type , payload} = action
    switch(type){
        case DELETE_PROJECT_USER_REQUEST:
            return{
            ...state,
            loading:true
        }
        case DELETE_PROJECT_USER_SUCCESS:
            return{
                ...state,
            loading:false,
            isDeleted:true,
            message:payload.message,
        }
        case DELETE_PROJECT_USER_FAIL:
        return{
            ...state,
            loading :false,
            error:payload.message,
            isDeleted:false
        }
        default:
               return state
    }
}


//To edit  Project:-
export const editProjectReducer = (state={
    loading:false,
     isEdited:false,
    project:[]
},action) =>{
    const {type , payload} = action
    switch(type){
        case EDIT_PROJECT_REQUEST:
            return{
            ...state,
            loading:true
        }
        case EDIT_PROJECT_SUCCESS:
            return{
                ...state,
            loading:false,
            isEdited:true,
            project:payload.project,
        }
        case EDIT_PROJECT_RESET:
            return{
                ...state,
            loading:false,
            isEdited:false,
            project:[],
        }
        case EDIT_PROJECT_FAIL:
        return{
            ...state,
            loading :false,
            error:payload
        }
        

        default:
               return state
    }
}

//Sell a Project:-
export const sellProjectReducer= (state={
    loading:false,
    isSold : false,
     project:[],
},action) =>{
    const {type , payload} = action
    switch(type){
        case SELL_PROJECT_REQUEST:
            return{
            ...state,
            loading:true
        }
        case SELL_PROJECT_SUCCESS:
            return{
                ...state,
            loading:false,
            isSold:true,
            project:payload.project,
            error:""
        }
        case SELL_PROJECT_FAIL:
        return{
            ...state,
            loading :false,
            isSold:false,
            error:payload
        }
        default:
               return state
    }
}



export const buyProjectReducer= (state={
    loading:false,
    isSent : false,
    message:""
    
},action) =>{
    const {type , payload} = action
    switch(type){
        case BUY_PROJECT_REQUEST:
            return{
            ...state,
            loading:true
        }
        case BUY_PROJECT_SUCCESS:
            return{
                ...state,
            loading:false,
            isSent:true,
           error : "",
           message : payload.message
        }
        case BUY_PROJECT_FAIL:
        return{
            ...state,
            loading :false,
            isSent:false,
            error:payload
        }
       
        case BUY_PROJECT_RESET:
            return{
                ...state,
                loading:false,
                isSent:false,
                message:""
            }

        default:
               return state
    }
}