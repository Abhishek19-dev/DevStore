const mongoose = require('mongoose')

const {Schema} = mongoose

const messageSchema = new Schema ({
    sender : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
    },
    content : {
        type : String,
        trim : true
    },
    chat : {
        type : mongoose.Schema.ObjectId,
        ref : "Chat",
    }
},{
    timestamps : true,
})

module.exports = mongoose.model("Message",messageSchema)