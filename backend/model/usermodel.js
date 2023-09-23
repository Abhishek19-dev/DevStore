const mongoose = require('mongoose')
const validator = require('validator')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new Schema({
    name : {
        type : String,
        required : [true,"Please Enter Your Name"],
        maxLength :[30,"Name is too long"],
        minLength : [4 , "Name should have more than 4 character"]
    },
    email :{
        type : String,
        required : [true,"Please Enter Your Email"],
        unique:true,
        validate : [validator.isEmail , "Please Enter a valid Email"]
    },
    password :{
        type : String,
        required : [true,"Please Enter Your Password"],
        minLength : [8 , "Password should have more than 8 character"]
    },
    phoneNo : {
        type : Number,
        maxLength :[10 , "Phone No cannot exceed 10 digits"],
        minLength : [10 , "Phone No is Wrong"],
        default : ""
    },
    whatsAppNo : {
        type : Number,
        default : "",
        maxLength :[10 , "WhatsApp No cannot exceed 10 digits"],
        minLength : [10 , "WhatsApp No is Wrong"]
    },
    address : {
        type : String,
        default : ""
    },
    bio : {
        type : String,
        default : "",
    },
    gender : {
        type : String,
    },
    createdAt: {
        type : Date,
        default : Date.now(),
    },
    avatar:{
        
            public_id:{
                type :String,
                required:true
            },
             url:{
                type :String,
                required:true
            }
           },
          role :{
              type:String,
              default:"user"
          } ,
          resetPasswordToken : String,
          resetPasswordExpire :Date

})


//encryption password:-
//execute this before saving pre is used
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
})


//JWT TOKEN:
const JWT_SECRET = "KJGFSDJKGJFDLKGJHFOIAHJSFKAJHKAJ"
const JWT_EXPIRE = "5d"
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id : this._id},JWT_SECRET,{
        expiresIn : JWT_EXPIRE,
    })
}

//Compare password
userSchema.methods.comparePassword = async function(enteredPassword,next){
    return (await bcrypt.compare(enteredPassword,this.password))
}


//Generating password reset token:
userSchema.methods.getResetPasswordToken = function(){

    //Generating Token:-
    const resetToken = crypto.randomBytes(20).toString("hex") //only randomBytes :- <buffer> 9c 35 36 78 </bufer>
    //tostring()+> 75r37rtie@@^$&#@)$ , toString("hex")=> 35324actr365bewrh834b3jreuyf9d
 
    //Hashinf and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 //converting it into millisec

    return resetToken;

}

module.exports = mongoose.model("User",userSchema)

