const express = require('express')
const { isAuthenticatedUser } = require('../middleware/auth')
const { accessChats, fetchAllChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, getAllUsers, getSingleUser } = require('../controller/chatController')




const router = express.Router()

router.post("/chat",isAuthenticatedUser,accessChats)
router.get("/allChats",isAuthenticatedUser,fetchAllChats)
router.post("/groupChats",isAuthenticatedUser,createGroupChat)
router.put("/renameGroup",isAuthenticatedUser,renameGroup)
router.put("/addToGroup",isAuthenticatedUser,addToGroup)
router.put("/removeFromGroup",isAuthenticatedUser,removeFromGroup)
router.get("/allUsers",isAuthenticatedUser,getAllUsers)
router.get("/singleUser",isAuthenticatedUser,getSingleUser)

exports.router = router 