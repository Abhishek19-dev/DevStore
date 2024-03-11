import { legacy_createStore as createStore ,combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {addReviewReducer, buyProjectReducer, deleteProjectUserReducer, editProjectReducer, getAllReviewsReducer,  getMyProjectsReducer, projectDetailsReducer, projectReducer, sellProjectReducer } from "./Reducer/ProjectReducer"
import { forgetPasswordReducer, loginReducer, logoutReducer, otpVerificationReducer, registerReducer, resetPasswordReducer } from "./Reducer/AuthReducer"
import { editProfileReducer, getSingleUserReducer, getUserDetailsReducer, updatePasswordReducer } from "./Reducer/UserReducer"
import { accessChatReducer, allChatUserReducer, allMessagesReducer, searchUserReducer, sendMessagesReducer } from "./Reducer/messagesReducer"

const reducer = combineReducers({
    project : projectReducer,
    projectDetails : projectDetailsReducer,
    loginAuth : loginReducer,
    logoutAuth : logoutReducer,
    registerAuth : registerReducer,
    otpVerfication:otpVerificationReducer,
    forgetPassword:forgetPasswordReducer,
    resetPassword:resetPasswordReducer,
    getAllReviews : getAllReviewsReducer,
    addReview : addReviewReducer,
    editProfile:editProfileReducer,
    userDetails:getUserDetailsReducer,
    updatePassword:updatePasswordReducer,
    myProject:getMyProjectsReducer,
    deleteProject:deleteProjectUserReducer,
    editProject:editProjectReducer,
    sellProject:sellProjectReducer,
    buyProject : buyProjectReducer,
    searchUser : searchUserReducer,
  accessChat : accessChatReducer,
  allChats : allChatUserReducer,
  sendMessage : sendMessagesReducer,
  allMessages : allMessagesReducer,
  getSingleUser : getSingleUserReducer,
})
   

let initialState = {}
const middleware = [thunk]

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store
