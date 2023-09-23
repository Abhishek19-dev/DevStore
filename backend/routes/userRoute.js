const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getOneUser, deleteUser, updateUserRole, sendInterestedUserEmail, } = require('../controller/usercontroller')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const { getMyProjects, editProjectDetails, deleteProject } = require('../controller/projectcontroller')
const { singleUpload } = require('../middleware/multer')

const router = express.Router()

router.post("/register",singleUpload,registerUser)
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassword)
router.get("/me",isAuthenticatedUser,getUserDetails)
router.put("/password/update",isAuthenticatedUser,updatePassword)
router.put("/profile/update",isAuthenticatedUser,updateProfile)
router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),getOneUser)
router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getOneUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
router.get("/myProjects",isAuthenticatedUser,getMyProjects)
router.put("/editProject/:id",isAuthenticatedUser,editProjectDetails)
router.delete("/deleteProject",isAuthenticatedUser,deleteProject)


router.get("/logOut",logout)

router.post("/buy",isAuthenticatedUser,sendInterestedUserEmail)

 
exports.router = router;