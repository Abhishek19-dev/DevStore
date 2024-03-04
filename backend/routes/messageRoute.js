const express = require('express')
const { isAuthenticatedUser } = require('../middleware/auth')
const { sendMessage, allMessages } = require('../controller/messageController')

const router = express.Router()

router.post("/message/send",isAuthenticatedUser , sendMessage)
router.get("/message/:chatId" , isAuthenticatedUser , allMessages)

exports.router = router 