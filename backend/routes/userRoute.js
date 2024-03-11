const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getOneUser, deleteUser, updateUserRole, sendInterestedUserEmail, confirmOtpVerification, } = require('../controller/usercontroller')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const {  editProjectDetails, deleteProject, getProjectsOfIndividualUsers } = require('../controller/projectcontroller')
const { singleUpload } = require('../middleware/multer')

const router = express.Router()

router.post("/register",singleUpload,registerUser)
router.post("/login",loginUser)
router.post("/otpVerification",confirmOtpVerification)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassword)
router.get("/me",isAuthenticatedUser,getUserDetails)
router.put("/password/update",isAuthenticatedUser,updatePassword)
router.put("/profile/update",isAuthenticatedUser,updateProfile)
router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.get("/user/:id",isAuthenticatedUser,getOneUser)
router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getOneUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
router.post("/SellProjectsList",isAuthenticatedUser,getProjectsOfIndividualUsers)
router.put("/editProject/:id",isAuthenticatedUser,editProjectDetails)
router.delete("/deleteProject",isAuthenticatedUser,deleteProject)


router.get("/logOut",logout)

router.post("/buy",isAuthenticatedUser,sendInterestedUserEmail)

 
exports.router = router;