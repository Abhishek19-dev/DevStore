import { ADD_REVIEW_FAIL, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ALL_PROJECT_FAIL, ALL_PROJECT_REQUEST, ALL_PROJECT_SUCCESS, BUY_PROJECT_FAIL, BUY_PROJECT_REQUEST, BUY_PROJECT_SUCCESS, DELETE_PROJECT_USER_FAIL, DELETE_PROJECT_USER_REQUEST, DELETE_PROJECT_USER_SUCCESS, EDIT_DETAILS_FAIL, EDIT_DETAILS_REQUEST, EDIT_DETAILS_SUCCESS, EDIT_PROJECT_FAIL, EDIT_PROJECT_REQUEST, EDIT_PROJECT_RESET, EDIT_PROJECT_SUCCESS, GET_ALL_REVIEWS_FAIL, GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS, GET_USER_ALL_PROJECT_FAIL, GET_USER_ALL_PROJECT_REQUEST, GET_USER_ALL_PROJECT_SUCCESS, PROJECT_DETAILS_FAIL, PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, RESET_REVIEWS, SELL_PROJECT_FAIL, SELL_PROJECT_REQUEST, SELL_PROJECT_SUCCESS } from "../ActionType"
import axios from "axios";



export const getAllProjects = (tags,languages,domain) => async(dispatch) =>{
    try {
        
       dispatch({
           type:ALL_PROJECT_REQUEST,
       })
      let link = `/api/v1/projects?languages=${languages}&domain=${domain}&tags=${tags}`

       const {data} = await axios.get(link)

       dispatch({
           type :ALL_PROJECT_SUCCESS,
           payload : data
       })

    } catch (error) {
        console.log(error)
        dispatch({
            type:ALL_PROJECT_FAIL,
            payload : error.response.data.message
        })
    }
}

//get Project Details:-
export const getProjectDetails = (id) => async(dispatch) =>{
    try {
        
       dispatch({
           type: PROJECT_DETAILS_REQUEST,
       })
      let link = `/api/v1/project/${id}`

       const {data} = await axios.get(link)

       dispatch({
           type : PROJECT_DETAILS_SUCCESS,
           payload : data
       })

    } catch (error) {
        console.log(error)
        dispatch({
            type:PROJECT_DETAILS_FAIL,
            payload : error.response.data.message
        })
    }
}



    


export const addReviewAction = (comment,rating,id) => async(dispatch)=>{
    try {
        dispatch({
            type:ADD_REVIEW_REQUEST,
        })
       
   
        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.put(`/api/v1/addReview/${id}`,{comment,rating},config)

        dispatch({
            type:ADD_REVIEW_SUCCESS,
            payload:data
        
        })
        
    } catch (error) {
    console.log(error)
        dispatch({
            type:ADD_REVIEW_FAIL,
            payload:error.response.data.message
        })
        
    }
    }

    //get all reviews:-
    export const getAllReviews = (id) => async(dispatch) =>{
        try {
            
           dispatch({
               type:GET_ALL_REVIEWS_REQUEST,
           })
          let link = `/api/v1/projectReviews/${id}`
           const {data} = await axios.get(link)
    
           dispatch({
               type : GET_ALL_REVIEWS_SUCCESS,
               payload : data
           })

    
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_ALL_REVIEWS_FAIL,
                payload : error.response.data
            })
        }
    }


    //Get user all Projects
    export const getMyProjects = () => async(dispatch) =>{
        try {
            
           dispatch({
               type:GET_USER_ALL_PROJECT_REQUEST,
           })
          let link = `/api/v1/myProjects`
           const {data} = await axios.get(link)
    
           dispatch({
               type : GET_USER_ALL_PROJECT_SUCCESS,
               payload : data
           })

    
        } catch (error) {
            console.log(error)
            dispatch({
                type:GET_USER_ALL_PROJECT_FAIL,
                payload : error.response.data
            })
        }
    }


    //Delete a project:-
    export const deleteProjectUser = (id,password) => async(dispatch) =>{

        try {
           dispatch({
               type:DELETE_PROJECT_USER_REQUEST,
           })
          let link = `/api/v1/deleteProject`
           const {data} = await axios.delete(link , {
            data:{
                id : id,
                password : password
            }
           })
    
           dispatch({
               type : DELETE_PROJECT_USER_SUCCESS,
               payload : data
           })
      
    
        } catch (error) {
            console.log(error)
            dispatch({
                type:DELETE_PROJECT_USER_FAIL,
                payload : error.response.data
            })
        }
    }


    //Edit project details:-
    export const editProjectDetailsAction = (title,description,languages,domain,price,id) => async(dispatch)=>{

        try {
            dispatch({
                type:EDIT_PROJECT_REQUEST,
            })
           
       
            const config = {headers :{"Content-type":"application/json"}};
            const {data} = await axios.put(`/api/v1/editProject/${id}`,{title,description,languages,domain,price},config)
    
            dispatch({
                type : EDIT_PROJECT_SUCCESS,
                payload : data
            })

        } catch (error) {
        console.log(error)
            dispatch({
                type:EDIT_PROJECT_FAIL,
                payload:error.response.data.message
            })
            
        }
        }

        //Sell a Project:-
        // export const sellProjectAction = (title,description,languages,domain,price,phoneNo,password,images) => async(dispatch)=>{
        export const sellProjectAction = (formData) => async(dispatch)=>{
            // console.log(title,description,languages,domain,phoneNo,price,password,images)
        //    images.map((image)=>{
        //     console.log(image.file)
        //    })

            // console.log(formData)
            try {
                dispatch({
                    type:SELL_PROJECT_REQUEST,
                })
                const config = {headers :{"Content-type":"multipart/form-data"}};
                // const {data} = await axios.post("/api/v1/sell",{title,description,languages,domain,price,phoneNo,password,files:images},config)
                const {data} = await axios.post("/api/v1/sell",formData,config)
        
                dispatch({
                    type : SELL_PROJECT_SUCCESS,
                    payload : data
                })
    
            } catch (error) {
            console.log(error)
                dispatch({
                    type:SELL_PROJECT_FAIL,
                    payload:error.response.data.message
                })
            }
            }
       

//Buy a project:-
export const buyProjectAction = (buyerEmail,sellerEmail,subject,description) => async(dispatch)=>{
    console.log(buyerEmail,sellerEmail,subject,description)
    try {
        dispatch({
            type:BUY_PROJECT_REQUEST,
        })

        const config = {headers :{"Content-type":"application/json"}};
        const {data} = await axios.post(`/api/v1/buy`,{buyerEmail,sellerEmail,subject,description},config)

        dispatch({
            type: BUY_PROJECT_SUCCESS,
            payload:data
        
        })
        
    } catch (error) {
    console.log(error)
        dispatch({
            type:BUY_PROJECT_FAIL,
            payload:error.response.data.message
        })
        
    }
    }