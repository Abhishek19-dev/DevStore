const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose

const chatSchema = new Schema ({
    chatName : {
        type:String,
        trim:true,
        required : true
    },
    isGroupChat : {
        type : Boolean,
        default : false
    },
    users : [{
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }],
    latestMessage : {
      type : mongoose.Schema.ObjectId,
      ref : "Message"
    },
    groupAdmin : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
}, {
    timestamps : true, //to show time stamps
})

module.exports = mongoose.model("Chat",chatSchema)