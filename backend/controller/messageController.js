const catchasyncerror = require('../middleware/catchasyncerror');
const ErrorHandler = require('../utils/errorhandler');
const Message = require('../model/messageModel')
const Chat = require('../model/chatModel');
const User = require("../model/usermodel");

exports.sendMessage = catchasyncerror(async(req,res,next)=>{
    const {content , chatId} = req.body
    if(!content || !chatId)
    {
        return (next(new ErrorHandler("Please enter the required fields",400)))
    }
    var newMessage = {
        sender : req.user.id,
        content : content,
        chat : chatId
    }

    var message = await Message.create(newMessage)
      message = await message.populate("sender","name avatar")//here execPopulate is used because we have wrritten it outside the block means not after query
      message = await message.populate("chat")
    //   message = await message.populate("user")
      message = await User.populate(message , {
        path : 'chat.users',
        select : "name avatar email"
      })
      
      await Chat.findByIdAndUpdate(req.body.chatId , {
        latestMessage : message
      },{
        new:true
      })
      if(!message)
      {
         return(next(new ErrorHandler("Unable to send Messages",400)))
      }
      res.status(200).json({
        success:true,
        message : message
      })

    })


    //get all messages of user:-
    exports.allMessages = catchasyncerror(async(req,res,next)=>{
        const messages = await Message.find({chat : req.params.chatId}).populate("sender", "name avatar email").populate("chat")
        if(!messages){
            return(next(new ErrorHandler("Messges not Found",400)))
        }
        res.status(200).json({
            success:true,
            messages : messages
        })

    })