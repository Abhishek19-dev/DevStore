const mongoose = require('mongoose')
const validator = require('validator')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const projectSchema = new Schema({
    title : {
        type : String,
        required : [true, "Please Enter project Title"],
        trim : true, //leading and trailing white space remove
        maxLength:[50,"title cannaot excedd 30 characters"]
    },
    description :{
      type:String,
      required : [true , "Please Enter Project Descriptiion"],
    //   minLength:[200,"Project Description must be atleast 200 words"],
    },
    languages :{
        type:String,
        required : [true , "Please Enter Languages Used"],
    },

    domain :{
        type:String,
        required : [true , "Please Enter Domain of Project"],
    },
    user :{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required:true,
    },
    phoneNo :{
        type : Number,
        required : [true, "Please Enter project Title"],
        minLength:[10,"Phone No must be atleast 10 Digits"],
        maxLength:[10,"PhoneNo cannaot excedd 10 numbers"]
    },
    price :{
        type : Number,
        required : [true, "Please Enter project Title"],
        maxLength:[8,"price cannaot excedd 8 characters"]
    },
    // tags : {
    //     type: String ,
    //     required : true,
    //     maxLength :[20 , "Taggs cannot exceed 20 Characters"]
    // },
    createdAt: {
        type : Date,
        default : Date.now(),
    },
    quantity :{
        type : Number,
        default : 1
    },
    OverallRatings :{
        type : Number,
        default : 0
    },
    images :[
        {
            public_id :{
                type : String ,
                required : true,
            },
            url :{
                type : String ,
                required : true
            }
        }
    ],
    numOfReviews :{
        type : Number ,
        default : 0,
    },
    reviews :[
        {
            user:{
                type : mongoose.Schema.ObjectId,
                ref : "user",
                required:true
            },
            name : {
                type : String ,
                required : true,
            },
            rating :{
                type : Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            },
            createdAt :{
                type : Date,
                default : Date.now()
            }
        }
    ]

})
//Compare password
projectSchema.methods.compareUserPassword = async function(enteredPassword,matchedPassword){
    return (await bcrypt.compare(enteredPassword,matchedPassword))
}

module.exports = mongoose.model("Projects",projectSchema)

